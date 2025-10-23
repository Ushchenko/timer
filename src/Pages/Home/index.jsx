import './Home.css'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
      <Link className='Link' to={"/Countdown"}>Click on me</Link>
    </>
  )
}