import "./Countdown.css";
import { useState, useEffect, createContext } from "react";
import { Calendar } from "../../Components/Calendar/index";
import { calculateCountdownInterval } from "../../Utils/CountdownState";

export const CalendarContext = createContext(null);

let text = {
  title: ["Trip to UK"],
  note: [
    "Amet aliquam eros faucibus bibendum sapien, neque",
    "tempor sed, egestas ad diam euismod suscipit facilisi,",
    "a nec urna, lobortis sed. Feugiat fermentum mauris vel",
    "ultricies, lorem morbi mauris. Taciti hendrerit lacus,",
    "duis sit ultrices, vel sem eget blandit ac, risus sociosqu ut",
    "fusce wisi per, iaculis nec fermentum lectus et et.",
  ],
};

export const Countdown = () => {
  //states
  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const [curDate, setCurDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const saved = localStorage.getItem("endDate");
    return saved ? new Date(saved) : null;
  });
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  let curDayName = curDate.toLocaleDateString("en-us", { weekday: "long" }),
    curDay = curDate.getDate(),
    curMonth = curDate.toLocaleString("en-us", { month: "long" }),
    curYear = curDate.getFullYear(),
    endDayName = endDate.toLocaleDateString("en-us", { weekday: "long" }),
    endDay = endDate.getDate(),
    endDayMonth = endDate.toLocaleString("en-us", { month: "long" }),
    endDateYear = endDate.getFullYear();

  //callbacks
  const getEndDate = (_endDate) => {
    setEndDate(new Date(_endDate));
  };

  const getCalendarIsShown = (_isShownCalendar) => {
    setIsCalendarShown(_isShownCalendar);
  };

  //effects
  useEffect(() => {
    // local storage
    if (endDate) localStorage.setItem("endDate", endDate.toISOString());
  }, [endDate]);

  useEffect(() => {
    if (!endDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      setCurDate(now);
      setTimeLeft(calculateCountdownInterval(endDate, now));
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="main">
      <div className="main__scene">
        <div className="scene__title">
          <div className="title__head">
            <h1 className="head--baner">{text.title}</h1>
            <span className="head--span">
              {curDayName}, {curDay} {curMonth} {curYear} - {endDayName},{" "}
              {endDay} {endDayMonth} {endDateYear}
            </span>
          </div>
        </div>
        <div className="scene__countdown">
          <ul className="countdown__timer">
            <li className="timer__block">
              <span className="timer__number --left">{timeLeft.days}</span>
              <span className="timer__text">Days</span>
            </li>
            <li className="timer__block">
              <span className="timer__number">{timeLeft.hours}</span>
              <span className="timer__text">Hours</span>
            </li>
            <li className="timer__block">
              <span className="timer__number">{timeLeft.minutes}</span>
              <span className="timer__text">Minutes</span>
            </li>
            <li className="timer__block">
              <span className="timer__number --right">{timeLeft.seconds}</span>
              <span className="timer__text">Seconds</span>
            </li>
          </ul>
        </div>
        <div className="scene__note">{text.note}</div>
      </div>
      <button
        className="title__button --button"
        onClick={(e) => {
          setIsCalendarShown((isShown) => !isShown);
        }}
      >
        Set end date
      </button>
      <CalendarContext.Provider value={{ getEndDate, getCalendarIsShown }}>
        {isCalendarShown && (
          <>
            <Calendar isShown={isCalendarShown} getEndDate={getEndDate} />
            <div
              id="bluredScene"
              onClick={() => {
                setIsCalendarShown((p) => (p = !p));
              }}
            ></div>
          </>
        )}
      </CalendarContext.Provider>
    </div>
  );
};
