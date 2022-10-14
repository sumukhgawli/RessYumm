import React, { useState } from 'react'
import { NavLink , useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", password: "" });
  let name,value;
  const handleinput = (e) => {
    console.log(e)
    name = e.target.name;
    value = e.target.value;
    setUser({...user,[name]:value})
  }
  const PostData = async(e)=>{
    e.preventDefault();
    const { name , password } =user;
   const res = await fetch("/auth/signin",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },body:JSON.stringify({name , password})
   });
   const data = await res.json();
   console.log(data.status)
   if (data.status === 422 || !data) {
    window.alert("Invalid Login")
    console.log("Invalid Login")
   }else{
    if (data.error) {
      window.alert(data.error);
      // navigate('/signin');
    }else if(data.message){
      window.alert(data.message)
      navigate('/editor');
    }
    else{
      window.alert("Unsuccessfull Signin")
    }}}
  return (
    <>
    <Navbar/>
      <section className='login_wrapper'>
        <div className='login_container '>
          <p className='login_container_heading'>Signin</p>
          <form className='login_Form' method='post'>
            <input type="text" placeholder="Enter Username" className='Login_username' name='name' value={user.name} onChange={handleinput} />
            <input type="password" placeholder="Enter Password" className='Login_password' name='password' value={user.password} onChange={handleinput} />
            <button className='login_butont'  onClick={PostData}> Signin</button>
            <NavLink to="/signup" style={{ textDecoration: 'none' }} ><p className='redirect_login'>Create an account</p></NavLink>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login