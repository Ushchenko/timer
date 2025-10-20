import { useContext } from "react";
import { EndDateContext } from "../Pages/MainSection"

const CountCalendarDays = (monthName, nowDate, year, month) => {
  const { getEndDate } = useContext(EndDateContext)

  function handleEvent(day, e) {
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
    console.log(selectedYear, monthName[selectedMonth], day);
    getEndDate(`${selectedYear} ${selectedMonth + 1} ${day}`)
  }

  const calendarDays = {
    tag: [],
    fullDays: [
      1, 2, 3, 4, 5, 6, 7,
      1, 2, 3, 4, 5, 6, 7,
      1, 2, 3, 4, 5, 6, 7,
      1, 2, 3, 4, 5, 6, 7,
      1, 2, 3, 4, 5, 6, 7,
      1, 2, 3, 4, 5, 6,
    ],
    daysAmount: new Date(year, month + 1, 0).getDate(),
    daysPrefix: new Date(year, month, 0).getDay(),
    prevMonthsDaysAmount: new Date(year, month, 0).getDate(),
  }

  if (calendarDays.daysPrefix > 0)
    for (let i = 1, j = calendarDays.prevMonthsDaysAmount - calendarDays.daysPrefix + 1; i <= calendarDays.daysPrefix; i++, j++)
      calendarDays.tag.push(
        <li
          className='days--number --prev'
          onClick={(e) => handleEvent(j, e)}
          key={j + i + 1}
        > {j}</li >
      )

  for (let i = 1; i <= calendarDays.daysAmount; i++)
    calendarDays.tag.push(
      <li
        className='days--number'
        onClick={(e) => handleEvent(i, e)}
        key={i - 1}
      >{i}</li>
    )

  if (calendarDays.tag.length < calendarDays.fullDays.length) {
    for (let i = 1; calendarDays.tag.length <= calendarDays.fullDays.length; i++) {
      calendarDays.tag.push(
        <li className='days--number --next'
          onClick={(e) => handleEvent(i, e)}
          key={i + calendarDays.tag.length}
        >{i}</li>
      )
    }
  }

  if (year === new Date().getFullYear() && month === new Date().getMonth()) {
    calendarDays.tag.splice(
      calendarDays.daysPrefix + nowDate.getDate() - 1, 1,
      <li
        className='days--number --cur'
        onClick={(e) => handleEvent(nowDate.getDate(), e)}
      >
        {nowDate.getDate()}</li>
    )
  }

  return calendarDays.tag
}

export default CountCalendarDays