import React, { useEffect, useState } from 'react'
import '../styles/calendar.css'
import CalendarDays from './CalendarDays'


export default Calendar


const nowDate = new Date()

const monthName = ["January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
]


function Calendar() {
  let [nowMonth, setMonth] = useState(nowDate.getMonth()),
    [nowYear, setYear] = useState(nowDate.getFullYear())

  function prevMonth() {
    if (nowMonth === 0) {
      setMonth(11)
      setYear((y) => y - 1)
    } else {
      setMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (nowMonth === 11) {
      setMonth(0)
      setYear((y) => y + 1)
    } else {
      setMonth((m) => m + 1)
    }
  }

  return (
    <section id="calendar">
      <div className='calendar__scene'>
        <ul className="scene__month">
          <li className='carret prev'>
            <button onClick={prevMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            </button>
          </li>
          <li>
            <div className='month__text'>
              <span className='month--name'>{monthName[nowMonth]}</span>
              <span className='year--name'>{nowYear}</span>
            </div>
          </li>
          <li className='carret next'>
            <button onClick={nextMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            </button>
          </li>
        </ul>
        <ul className="scene__weekdays">
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thr</li>
          <li>Fri</li>
          <li>Sat</li>
          <li>Sun</li>
        </ul>
        <ul className="days">
          {CalendarDays(monthName, nowDate, nowYear, nowMonth)}
        </ul>
      </div>
    </section>
  )
}