export const calculateCountdownInterval = (endDate, curDate) => {
  const diff = endDate - curDate
  if (diff < 0) return { days: '00', hours: '00', minutes: '00', seconds: '00', }

  const days = Math.floor(diff / 1000 / 3600 / 24)
  const hours = Math.floor(diff / 1000 / 3600 % 24)
  const minutes = Math.floor(diff / 1000 / 60 % 60)
  const seconds = Math.floor(diff / 1000 % 60)

  const pad = (n) => String(n).padStart(2, '0')

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  }
}