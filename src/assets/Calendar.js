import React, { useEffect, useState } from 'react';
import '../styles/calendar.css';

export default Calendar;


const nowDate = new Date();

let nowYear = nowDate.getFullYear(),
	nowMonth = nowDate.getMonth();


function Calendar() {
	const monthName = ["January", "February", "March",
			"April", "May", "June", "July",
			"August", "September", "October",
			"November", "December"
		];
	
	let [nowMonthName, setMonthName] = useState(monthName[nowDate.getMonth()]),
		[nowYearName, setYearName] = useState(nowDate.getFullYear());

	function handleNowMonthName(newNowMonthName) {
		setMonthName(newNowMonthName)
	}

	function handleNowYearName(newNowYearName) {
		setYearName(newNowYearName)
	}

	return (
		<section id="calendar">
			<div className='calendar__scene'>
				<ul className="scene__month">
					<li className='carret prev'>
						<button onClick={() => {
							nowMonth--;

							if(nowMonth <= 0) {
								nowMonth = 11;
								nowYear--;
							}
							handleNowMonthName(monthName[nowMonth]);
							handleNowYearName(nowYear);
							Days(nowYear, nowMonth);
						}}>
							<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
								<path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
							</svg>
						</button>
					</li>
					<li>
						<div className='month__text'>
							<span className='month--name'>{nowMonthName}</span>
							<span className='year--name'>{nowYearName}</span>
						</div>
					</li>
					<li className='carret next'>
						<button onClick={() => {
							nowMonth++;

							if(nowMonth >= 12) {
								nowMonth = 0;
								nowYear++;
							}
							handleNowMonthName(monthName[nowMonth]);
							handleNowYearName(nowYear);
							Days(nowYear, nowMonth)
						}}>
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
					{Days(nowYear, nowMonth)}
				</ul>
			</div>
		</section>
	)
}

function Days(year, month) {

	const calendarDays = {
		tag: []
	};
	let
	 	daysAmount = new Date(year, month + 1, 0).getDate(),
		daysPrefix = new Date(year, month, 0).getDay(),
		prevMonthsDaysAmount = new Date(year, month, 0).getDate(),
		prevMonthsPostfix = new Date(year, month + 1, 0).getDay();
		

	if(daysPrefix > 0) 
		for(let i = 1, j = prevMonthsDaysAmount - daysPrefix + 1; i <= daysPrefix; i++, j++) 
			calendarDays.tag.push(<li className='days--number--prev'>{j}</li>)
		

	for(let i = 1; i <= daysAmount; i++)
		calendarDays.tag.push(<li className='days--number'>{i}</li>)

	
	return (
		calendarDays.tag
	)
}