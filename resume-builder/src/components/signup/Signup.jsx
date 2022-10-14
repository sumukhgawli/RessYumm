import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom"
import Navbar from "../Navbar/Navbar";
import "./Signup.css";
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", password: "", c_password: "", email: "" });
  let name, value;
  const handleinput = (e) => {
    console.log(e)
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
  }
  const PostData = async (e) => {
    e.preventDefault();
    const { name, password, c_password, email } = user;
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({ name, password, c_password, email })
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid Signup")
      console.log("Invalid Signup")
    } else {
      if (data.error) {
        window.alert(data.error);
      } else if (data.message) {
        window.alert(data.message)
        navigate('/login');
      } else {
        window.alert("Unsuccessfull Signup")
      }
    }
  }
  return (
    <>
      <Navbar />
      <section className='Signup_wrapper'>
        <div className='Signup_container '>
          <p className='Signup_container_heading'>Signup</p>
          <form className='Signup_Form' method='post'>
            <input type="text" placeholder="Enter Username" className='Signup_username' name='name' value={user.name} onChange={handleinput} />
            <input type="password" placeholder="Enter Password" className='Signup_password' name='password' value={user.password} onChange={handleinput} />
            <input type="password" placeholder="Confirm Password" className='Signup_password' name='c_password' value={user.c_password} onChange={handleinput} />
            <input type="email" placeholder="Enter Email ID" className='Signup_password' name='email' value={user.email} onChange={handleinput} />
            <button className='Signup_butont' onClick={PostData}> Signup</button>
            <NavLink to="/login" style={{ textDecoration: 'none' }} ><p className='redirect_login'>Already have an account</p></NavLink>
          </form>
        </div>
      </section>
    </>
  )
}
export default Signup