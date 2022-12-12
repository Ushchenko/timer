import '../styles/main.css';
import { useState, useEffect } from 'react';
import Calendar from './Calendar';
import BruledSCene from './BluredScene';

export default MainSection;


let curDate = new Date(),
	endDate = new Date('2022.12.12 13:30'),

	curDayName = curDate.toLocaleDateString('en-us', { weekday: 'long' }),
	curDay = curDate.getDate(),
	curMonth = curDate.toLocaleString('en-us', { month: 'long' }),
	curYear = curDate.getFullYear();

let text = {
	title: ['Trip to UK'],
	note: ['Amet aliquam eros faucibus bibendum sapien, neque',
			'tempor sed, egestas ad diam euismod suscipit facilisi,',
			'a nec urna, lobortis sed. Feugiat fermentum mauris vel',
			'ultricies, lorem morbi mauris. Taciti hendrerit lacus,',
			'duis sit ultrices, vel sem eget blandit ac, risus sociosqu ut',
			'fusce wisi per, iaculis nec fermentum lectus et et.'
	],
}



function MainSection() {
	const [seconds, setSeconds] = useState((seconds) => {
		if (endDate - curDate < 0) return seconds = `00`
		if (Math.floor((endDate - curDate) / 1000 % 60) < 10)
			return seconds = `0${Math.floor((endDate - curDate) / 1000 % 60)}`
		else return seconds = `${Math.floor((endDate - curDate) / 1000 % 60)}`
	});

	const [minutes, setMinutes] = useState((minutes) => {
		if(endDate - curDate < 0) return minutes = `00`
		if (Math.floor((endDate - curDate) / 1000 / 60 % 60) < 10)
			return minutes = `0${Math.floor((endDate - curDate) / 1000 / 60 % 60)}`
		else return minutes = `${Math.floor((endDate - curDate) / 1000 / 60 % 60)}`
	});
	
	const [hours, setHours] = useState((hours) => {
		if (endDate - curDate < 0) return hours = `00`
		if (Math.floor((endDate - curDate) / 1000 / 3600 % 60 % 24) < 10)
			return hours = `0${Math.floor((endDate - curDate) / 1000 / 3600 % 60 % 24)}`
		else return hours = `${Math.floor((endDate - curDate) / 1000 / 3600 % 60 % 24)}`
	});

	const [days, setDays] = useState((days) => {
		if (endDate - curDate < 0) return days = `00`
		if (Math.round((endDate - curDate) / 1000 / 3600 / 24) < 10)
			return days = `0${Math.round((endDate - curDate) / 1000 / 3600 / 24) }`
		else return days = `${Math.round((endDate - curDate) / 1000 / 3600 / 24) }`
	})

	const [isShownCalendar, setIsShownCalendar] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			curDate = new Date();
			setSeconds((prevSeconds) => {
				if (endDate - curDate < 0) return prevSeconds = `00`
				if (Math.floor((endDate - curDate) / 1000 % 60) < 10)
					return prevSeconds = `0${Math.floor((endDate - curDate) / 1000 % 60)}`
				else return prevSeconds = `${Math.floor((endDate - curDate) / 1000 % 60)}`
			});
		}, 1000)

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			curDate = new Date();
			setMinutes((prevMinutes) => {
				if (endDate - curDate < 0) return prevMinutes = `00`
				if (Math.floor((endDate - curDate) / 1000 / 60 % 60) < 10)
					return prevMinutes = `0${Math.floor((endDate - curDate) / 1000 / 60 % 60)}`
				else return prevMinutes = `${Math.floor((endDate - curDate) / 1000 / 60 % 60)}`
			})
		}, 1000)

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			curDate = new Date();
			setHours((prevHours) => {
				if (endDate - curDate < 0) return prevHours = `00`
				if (Math.floor((endDate - curDate) / 1000 / 3600 % 60 % 24) < 10)
					return prevHours = `0${Math.floor((endDate - curDate) / 1000 / 3600 % 60 % 24)}`
				else return prevHours = `${Math.floor((endDate - curDate) / 1000 / 3600 % 60 % 24)}`
			})
		}, 1000)

		return () => clearInterval(interval)
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			curDate = new Date();
			setDays((prevDays) => {
				if (endDate - curDate < 0) return prevDays = `00`
				if (Math.round((endDate - curDate) / 1000 / 3600 / 24) < 10)
					return prevDays = `0${Math.round((endDate - curDate) / 1000 / 3600 / 24)}`
				else return prevDays = `${Math.round((endDate - curDate) / 1000 / 3600 / 24)}`
			})
		}, 1000)

		return () => clearInterval(interval)
	}, []);

	return (
		<section className="main">
			{isShownCalendar && <Calendar/>}
			<section className='main__scene'>
				<section className='scene__title'>
					<section className='title__head'>
						<h1 className='head--baner'>{text.title}</h1>
						<span className='head--span'>{curDayName}, {curDay} {curMonth} {curYear}</span>
					</section>
				</section>
					
				<section className='scene__countdown'>
					<ul className='countdown__timer'>
						<li className='timer__block'>
							<span className='timer__number --left'>{days}</span>
							<span className='timer__text'>Days</span>
						</li>
						<li className='timer__block'>
							<span className='timer__number'>{hours}</span>
							<span className='timer__text'>Hours</span>
						</li>
						<li className='timer__block'>
							<span className='timer__number'>{minutes}</span>
							<span className='timer__text'>Minutes</span>
						</li>
						<li className='timer__block'>
							<span className='timer__number --right'>{seconds}</span>
							<span className='timer__text'>Seconds</span>
						</li>
					</ul>
				</section>

				<section className='scene__note'>
					{text.note}
				</section>
				
			</section>
			<button className='title__button --button' onClick={(e) => {
				setIsShownCalendar((isShown) => !isShown);
			}}>
				Set end date
			</button>
			{isShownCalendar && <BruledSCene/>}
		</section>
	)
}