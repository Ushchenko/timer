import "./Home.css";
import { Header } from "../../Components/Header";
import { Intro } from "../../Components/Intro";
import { TaskDemo } from "../../Components/TaskDemo";

export const Home = () => {

  return (
    <>
      <Header />
      <Intro />
      <TaskDemo />
    </>
  );
};
