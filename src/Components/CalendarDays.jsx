import { useContext } from "react";
import CountCalendarDays from "../Utils/CountCalendarDays";

const CalendarDays = (monthName, nowDate, year, month) => {
  

  return (
    CountCalendarDays(monthName, nowDate, year, month)
  )
}

export default CalendarDays