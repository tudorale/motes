import React from 'react'
import "../../style/css/main.css"

function Navbar() {
    return (
        <div className="navbar">
            <h1 className="logo"><span>M</span>otes</h1>
            <ul>
                <li><a href="/">About Motes</a></li>
                <li><a href="https://tudorale.github.io/portfolio/" target="_blank" rel="noreferrer">Creator</a></li>
            </ul>
        </div>
    )
}

export default Navbar
