import React, { useState } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink } from "react-router-dom"
const Navbar = () => {
    // State to store hamburger click
    const [show_bur, set_bur] = useState(false);
    return (
        <>

            <header>
                <h3 className="logo">ResYumm</h3>
                <div className={show_bur ? "NavLinks_mob" : "NavLinks"}>
                    <ul>
                        <li> <NavLink to="/" style={{ textDecoration: 'none' }}> HOME </NavLink> </li>
                        <li>ABOUT US </li>
                        <li>CONTACT US </li>
                    </ul>
                </div>

                <div className="NavLeftGrp">
                    <NavLink to="/login" >
                        <button className="signin">SIGN IN </button>
                    </NavLink>
                    <div className="hamnburger-menu" onClick={() => set_bur(!show_bur)}>
                        <GiHamburgerMenu />
                    </div>
                </div>


            </header>
        </>
    );
}

export default Navbar;
