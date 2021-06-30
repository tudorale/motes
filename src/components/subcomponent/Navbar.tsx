import React from 'react'
import "../../style/css/main.css"
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/"><h1 className="logo"><span>M</span>otes</h1></Link>
            <ul>
                <li><Link to="/about">About Motes</Link></li>
                <li><a href="https://tudorale.github.io/portfolio/" target="_blank" rel="noreferrer">Creator</a></li>
            </ul>
        </div>
    )
}

export default Navbar
