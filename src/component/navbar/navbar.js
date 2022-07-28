import React from 'react'
import logo from '../../image/News.jpg'
import "./navbar.css";

function navbar() {
  return (
    <div className='navbar' id='navbar'>
        <div className='logo-image'>
            <img className='logo' src={logo}  style={{height:"95px"}}></img>
        </div>
        <div className="navigation">
          <ul className="navbar">
            <a href="#Home">
              <li className="nav_items">Home</li>
            </a>
          </ul>
        </div>
    </div>
  )
}

export default navbar