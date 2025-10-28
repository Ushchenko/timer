#!/usr/bin/env python3
"""
Cuckoo-filter spam demo with persistent spam list file,
now supporting target false-positive probability (p) and target occupancy (load).

- If spam_list.txt exists and non-empty -> use it
- Else generate n_spam addresses and save to spam_list.txt
- Compute fingerprint_size f and number of buckets to match:
    target_fpr = p
    target_occupancy = occupancy (fraction, e.g. 0.84)
- Build CuckooFilter with computed parameters and proceed.
"""

import math, random, string, hashlib, csv
from pathlib import Path

# ---------- Cuckoo Filter ----------
class CuckooFilter:
    def __init__(self, num_buckets:int, bucket_size:int=4, fingerprint_size:int=16, max_kicks:int=500):
        """
        num_buckets: number of buckets (each bucket has bucket_size slots)
        bucket_size: number of slots per bucket (b)
        fingerprint_size: fingerprint length in bits (f)
        """
        self.bucket_size = bucket_size
        self.max_kicks = max_kicks
        self.num_buckets = max(1, int(num_buckets))
        self.fingerprint_size = max(1, int(fingerprint_size))
        self.capacity = self.num_buckets * self.bucket_size
        self.buckets = [[] for _ in range(self.num_buckets)]

    def _hash(self, data: str) -> int:
        return int(hashlib.md5(data.encode("utf-8")).hexdigest(), 16)

    def _fingerprint(self, item: str) -> int:
        h = hashlib.sha1(item.encode("utf-8")).hexdigest()
        fp_int = int(h, 16) % (1 << self.fingerprint_size)
        return fp_int if fp_int != 0 else 1

    def _alt_index(self, index: int, fingerprint: int) -> int:
        return (index ^ (self._hash(str(fingerprint)))) % self.num_buckets

    def add(self, item: str) -> bool:
        fp = self._fingerprint(item)
        i1 = self._hash(item) % self.num_buckets
        i2 = self._alt_index(i1, fp)

        for i in (i1, i2):
            if len(self.buckets[i]) < self.bucket_size:
                self.buckets[i].append(fp)
                return True

        i = random.choice([i1, i2])
        for _ in range(self.max_kicks):
            j = random.randrange(len(self.buckets[i]))
            old_fp = self.buckets[i][j]
            self.buckets[i][j] = fp
            fp = old_fp
            i = self._alt_index(i, fp)
            if len(self.buckets[i]) < self.bucket_size:
                self.buckets[i].append(fp)
                return True
        return False  # переповнення

    def contains(self, item: str) -> bool:
        fp = self._fingerprint(item)
        i1 = self._hash(item) % self.num_buckets
        i2 = self._alt_index(i1, fp)
        return fp in self.buckets[i1] or fp in self.buckets[i2]

    def delete(self, item: str) -> bool:
        fp = self._fingerprint(item)
        i1 = self._hash(item) % self.num_buckets
        i2 = self._alt_index(i1, fp)
        for i in (i1, i2):
            if fp in self.buckets[i]:
                self.buckets[i].remove(fp)
                return True
        return False

# ---------- Генератори ----------
def random_name(length=6):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def generate_spam_emails(n):
    domains = ["mail.com", "spammy.net", "offers.co", "ads.example", "promo.org", "cheap-shop.ua", "bulk.mail"]
    patterns = [
        lambda i, d: f"spam{i}@{d}",
        lambda i, d: f"{random_name(8)}.{i}@{d}",
        lambda i, d: f"{random_name(4)}_{random_name(3)}@{d}",
        lambda i, d: f"newsletter{i}@{d}",
        lambda i, d: f"no-reply@{d}" if i % 10 == 0 else f"promo{i}@{d}"
    ]
    out = []
    for i in range(n):
        d = random.choice(domains)
        pattern = random.choice(patterns)
        out.append(pattern(i, d))
    return out

def generate_nonspam_emails(m):
    good_domains = ["gmail.com", "yahoo.com", "ukr.net", "company.local", "student.edu", "outlook.com"]
    out = []
    for i in range(m):
        name = random_name(7)
        out.append(f"{name}{i}@{random.choice(good_domains)}")
    return out

# ---------- Файл спаму ----------
def load_or_create_spam_file(path: Path, n_spam: int) -> list:
    if path.exists():
        try:
            text = path.read_text(encoding="utf-8").strip()
            if text:
                lines = [line.strip() for line in text.splitlines() if line.strip()]
                seen = set()
                unique = []
                for l in lines:
                    if l not in seen:
                        seen.add(l)
                        unique.append(l)
                return unique
        except Exception as e:
            print(f"Не вдалося прочитати {path}: {e}. Новий список генерується.")
    spam_list = generate_spam_emails(n_spam)
    try:
        path.write_text("\n".join(spam_list), encoding="utf-8")
        print(f"Створено файл спам-листу: {path} ({len(spam_list)} записів)")
    except Exception as e:
        print(f"Не вдалося записати {path}: {e}")
    return spam_list

def append_spam_to_file(path: Path, email: str):
    existing = []
    if path.exists():
        existing = [line.strip() for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]
        if email in existing:
            return
    with path.open("a", encoding="utf-8") as f:
        f.write(email + "\n")

def remove_spam_from_file(path: Path, email: str):
    if not path.exists():
        return
    lines = [line.rstrip("\n") for line in path.read_text(encoding="utf-8").splitlines()]
    new_lines = [l for l in lines if l.strip() and l.strip() != email]
    path.write_text("\n".join(new_lines), encoding="utf-8")

# ---------- Розрахунок параметрів для cuckoo ----------
def compute_cuckoo_params(n_items:int,
                          target_fpr:float=0.02,
                          target_occupancy:float=0.84,
                          bucket_size:int=4):
    if target_fpr <= 0 or target_fpr >= 1:
        raise ValueError("target_fpr має бути в (0,1)")
    if target_occupancy <= 0 or target_occupancy >= 1:
        raise ValueError("target_occupancy має бути між 0 і 1 (не включно)")

    b = bucket_size
    f = math.ceil(math.log2(b / target_fpr))
    # num buckets so that capacity * occupancy >= n_items
    num_buckets = math.ceil(n_items / (b * target_occupancy))
    if num_buckets < 1:
        num_buckets = 1
    capacity = num_buckets * b
    achieved_occupancy = n_items / capacity
    return int(f), int(num_buckets), int(capacity), float(achieved_occupancy)

# ---------- Main ----------
if __name__ == "__main__":
    random.seed(1934)

    # Параметри (користувацькі вимоги)
    n_spam_default = 150
    n_nonspam = 100000
    target_fpr = 0.02     
    target_occupancy = 0.84  
    bucket_size = 4

    # директорія скрипта (fallback на cwd)
    try:
        script_dir = Path(__file__).parent.resolve()
    except NameError:
        script_dir = Path.cwd()

    spam_file = script_dir / "spam_list.txt"
    spam_emails = load_or_create_spam_file(spam_file, n_spam_default)
    n_spam = len(spam_emails)
    print(f"Використовується {n_spam} спам-адрес(и) із файлу {spam_file}")

    # Розрахунок параметрів cuckoo
    f_bits, num_buckets, capacity, achieved_occupancy = compute_cuckoo_params(
        n_items=n_spam,
        target_fpr=target_fpr,
        target_occupancy=target_occupancy,
        bucket_size=bucket_size
    )

    print("\n=== Налаштування Cuckoo Filter ===")
    print(f"target_fpr: {target_fpr:.4f} ({target_fpr*100:.2f}%)")
    print(f"target_occupancy: {target_occupancy:.2f}")
    print(f"bucket_size (b): {bucket_size}")
    print(f"fingerprint_size (f): {f_bits} біт")
    print(f"num_buckets: {num_buckets}")
    print(f"capacity (num_buckets * b): {capacity}")
    print(f"estimated achieved occupancy: {achieved_occupancy:.4f}")

    # Створити CuckooFilter з обчисленими параметрами
    cf = CuckooFilter(num_buckets=num_buckets, bucket_size=bucket_size, fingerprint_size=f_bits)

    # Додати spam_emails у фільтр
    added_count = 0
    for e in spam_emails:
        if cf.add(e):
            added_count += 1
    print(f"\nДодано до фільтра: {added_count}/{n_spam} (успішно)")

    # Генерація nonspam для тестування
    nonspam_emails = generate_nonspam_emails(n_nonspam)

    # Підготовка rows та підрахунок статистики
    rows = []
    for e in spam_emails:
        rows.append({"email": e, "is_spam_by_filter": int(cf.contains(e)), "is_actual_spam": 1})
    for e in nonspam_emails:
        rows.append({"email": e, "is_spam_by_filter": int(cf.contains(e)), "is_actual_spam": 0})

    tp = sum(1 for r in rows if r["is_actual_spam"]==1 and r["is_spam_by_filter"]==1)
    fn = sum(1 for r in rows if r["is_actual_spam"]==1 and r["is_spam_by_filter"]==0)
    fp = sum(1 for r in rows if r["is_actual_spam"]==0 and r["is_spam_by_filter"]==1)
    tn = sum(1 for r in rows if r["is_actual_spam"]==0 and r["is_spam_by_filter"]==0)

    summary = {
        "n_spam_used": n_spam,
        "n_nonspam_tested": n_nonspam,
        "bucket_size": bucket_size,
        "fingerprint_bits": f_bits,
        "num_buckets": num_buckets,
        "capacity": capacity,
        "true_positives": tp,
        "false_negatives": fn,
        "false_positives": fp,
        "true_negatives": tn,
        "measured_false_positive_rate": (fp / n_nonspam) if n_nonspam>0 else None,
        "estimated_occupancy": achieved_occupancy
    }

    csv_path = script_dir / "emails_report_cuckoo.csv"
    summary_path = script_dir / "emails_report_cuckoo_summary.txt"

    with open(csv_path, "w", newline='', encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["email", "is_spam_by_filter", "is_actual_spam"])
        writer.writeheader()
        writer.writerows(rows)

    with open(summary_path, "w", encoding="utf-8") as f:
        for k, v in summary.items():
            f.write(f"{k}: {v}\n")

    print(f"\nФайли збережено:\n - {csv_path}\n - {summary_path}")

    # ---------- Інтерактивний режим ----------
    print("\n=== Інтерактивний режим ===")
    print("  1 - додати e-mail")
    print("  2 - перевірити e-mail")
    print("  3 - видалити e-mail")
    print("  0 - вихід\n")

    while True:
        choice = input("Оберіть дію (0-4): ").strip()
        if choice == "0":
            print("Вихід із програми.")
            break
        elif choice == "1":
            email = input("Введіть e-mail для додавання: ").strip()
            if not email:
                print("Порожній рядок. Спробуйте ще раз.")
                continue
            added = cf.add(email)
            append_spam_to_file(spam_file, email)
            print("Додано у фільтр." if added else "Додано у файл, але фільтр може бути переповнений.")
        elif choice == "2":
            email = input("Введіть e-mail для перевірки: ").strip()
            if not email:
                print("Порожній рядок. Спробуйте ще раз.")
                continue
            result = cf.contains(email)
            print(f"🔍 {email} -> {'СПАМ' if result else 'не спам'}")
        elif choice == "3":
            email = input("Введіть e-mail для видалення: ").strip()
            if not email:
                print("Порожній рядок. Спробуйте ще раз.")
                continue
            deleted = cf.delete(email)
            remove_spam_from_file(spam_file, email)
            print("Видалено із фільтра." if deleted else "Не знайдено у фільтрі.")
        else:
            print("Невірна команда.")
