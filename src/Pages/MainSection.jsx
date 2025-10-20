import '../styles/main.css';
import { useState, useEffect, createContext } from 'react';
import Calendar from "../Components/Calendar"
import * as CountdownFunctions from "../Utils/CountdownState"
import BruledScene from '../Components/BluredScene';

export default MainSection;


let curDate = new Date(),
  curDayName = curDate.toLocaleDateString('en-us', { weekday: 'long' }),
  curDay = curDate.getDate(),
  curMonth = curDate.toLocaleString('en-us', { month: 'long' }),
  curYear = curDate.getFullYear()

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

export const EndDateContext = createContext(null)

function MainSection() {
  const [isShownCalendar, setIsShownCalendar] = useState(false)
  const [curDate, setCurDate] = useState(new Date())
  const [endDate, setEndDate] = useState(() => {
    const saved = localStorage.getItem("endDate");
    return saved ? new Date(saved) : null;
  })  
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })
  
  const getEndDate = (_endDate) => {
    console.log(_endDate)
    setEndDate(new Date(_endDate))
  }
  
  useEffect(() => {
    if (endDate) localStorage.setItem("endDate", endDate.toISOString());
  }, [endDate]);

  useEffect(() => {
    if (!endDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      setCurDate(now);
      setTimeLeft(CountdownFunctions.calculateCountdownInterval(endDate, now));
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (

    <section className="main">
      <EndDateContext.Provider value={{ getEndDate }}>
        {isShownCalendar && <Calendar isShown={isShownCalendar} getEndDate={getEndDate} />}
      </EndDateContext.Provider>
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
              <span className='timer__number --left'>{timeLeft.days}</span>
              <span className='timer__text'>Days</span>
            </li>
            <li className='timer__block'>
              <span className='timer__number'>{timeLeft.hours}</span>
              <span className='timer__text'>Hours</span>
            </li>
            <li className='timer__block'>
              <span className='timer__number'>{timeLeft.minutes}</span>
              <span className='timer__text'>Minutes</span>
            </li>
            <li className='timer__block'>
              <span className='timer__number --right'>{timeLeft.seconds}</span>
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
      {isShownCalendar && <BruledScene />}
    </section>
  )
}