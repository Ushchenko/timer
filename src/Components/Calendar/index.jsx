import "./Calendar.css";
import { useState } from "react";
import { CountCalendarDays } from "../../Utils/CountCalendarDays";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const nowDate = new Date();
const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Calendar = () => {
  const [nowMonth, setMonth] = useState(nowDate.getMonth());
  const [nowYear, setYear] = useState(nowDate.getFullYear());

  const [parent] = useAutoAnimate({ duration: 500 });

  function prevMonth() {
    if (nowMonth === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (nowMonth === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  return (
    <section id="calendar">
      <div className="calendar__scene">
        <ul className="scene__month">
          <li className="carret prev">
            <button onClick={prevMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="currentColor"
                className="bi bi-caret-up-fill"
                viewBox="0 0 16 16"
              >
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
            </button>
          </li>
          <li>
            <div className="month__text">
              <span className="month--name">{monthName[nowMonth]}</span>
              <span className="year--name">{nowYear}</span>
            </div>
          </li>
          <li className="carret next">
            <button onClick={nextMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="currentColor"
                className="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </button>
          </li>
        </ul>
        <div className="scene__weeks">
          <ul className="scene__weekdays">
            <li key={"Mon"}>Mon</li>
            <li key={"Tue"}>Tue</li>
            <li key={"Wed"}>Wed</li>
            <li key={"Thr"}>Thr</li>
            <li key={"Fri"}>Fri</li>
            <li key={"Sat"}>Sat</li>
            <li key={"Sun"}>Sun</li>
          </ul>
          <ul className="scene__days" ref={parent}>
            <CountCalendarDays
              nowDate={nowDate}
              year={nowYear}
              month={nowMonth}
            />
          </ul>
        </div>
      </div>
    </section>
  );
};
