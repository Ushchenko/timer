import { useEffect, useRef, useState } from 'react';
import './Home.css'
import { Header } from '../../Components/Header';
import { Intro } from '../../Components/Intro';
import { TaskLayer } from '../../Components/TaskLayer';


export const Home = () => {
  const [animate, setAnimate] = useState(false)

  return (
    <>
      <Header />
      <Intro />
      <div className='task__demo'>
        <div className='task__wrapper'>
          <TaskLayer />
        </div>
      </div>
    </>
  )
}