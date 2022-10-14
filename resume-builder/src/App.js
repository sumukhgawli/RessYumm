import React from "react";
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body/Body";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/editor' element={<div className="App"><Body /></div>} />
        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
}
export default App;
