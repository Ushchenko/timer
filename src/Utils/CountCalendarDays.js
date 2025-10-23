import "../Components/Calendar/Calendar.css"
import { useContext } from "react";
import { CalendarContext } from "../Pages/Countdown"

export const CountCalendarDays = ({ nowDate, year, month }) => {
  const { getEndDate, getCalendarIsShown } = useContext(CalendarContext)

  //functions
  const selectDay = (day, e) => {
    let selectedYear = year;
    let selectedMonth = month;
    if (e.currentTarget.className.includes("--prev")) {
      selectedMonth -= 1;
      if (selectedMonth < 0) {
        selectedMonth = 11;
        selectedYear -= 1;
      }
    }
    else if (e.currentTarget.className.includes("--next")) {
      selectedMonth += 1;
      if (selectedMonth > 11) {
        selectedMonth = 0;
        selectedYear += 1;
      }
    }
    getEndDate(`${selectedYear} ${selectedMonth + 1} ${day}`)
    getCalendarIsShown(false)
  }

  const createListItem = ({ type, day }) => {
    const isCurrentDay =
      day === nowDate.getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()

    return (
      <li
        key={`${type}-${day}`}
        className={`days--number ${isCurrentDay ? "--cur" : `${type}`}`}
        onClick={(e) => selectDay(day, e)}
      >
        {day}
      </li>
    )
  }

  const calendarDays = {
    days: [],
    daysAmount: new Date(year, month + 1, 0).getDate(),
    daysPrefix: new Date(year, month, 0).getDay(),
    prevMonthsDaysAmount: new Date(year, month, 0).getDate(),
  }

  for (let i = calendarDays.daysPrefix; i > 0; i--)
    calendarDays.days.push({ type: "--prev", day: calendarDays.prevMonthsDaysAmount - i + 1 })

  for (let i = 1; i <= calendarDays.daysAmount; i++)
    calendarDays.days.push({ type: "", day: i })

  while (calendarDays.days.length < 42)
    calendarDays.days.push({ type: "--next", day: calendarDays.days.length - (calendarDays.daysPrefix + calendarDays.daysAmount) + 1 })

  return calendarDays.days.map(({ type, day }) => {
    const isCurrentDay =
      day === nowDate.getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()

    return (
      <li
        key={`${year}-${month}-${type}-${day}`}
        className={`days--number ${isCurrentDay ? "--cur" : type}`}
        onClick={(e) => selectDay(day, e, type)}
      >
        {day}
      </li>
    );
  });
}