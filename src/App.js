import React from "react";
import { Route, Routes } from "react-router-dom";
import { Countdown } from "./Pages/Countdown";
import { Home } from "./Pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Countdown" element={<Countdown />} />
      </Routes>
    </>
  );
}

export default App;
