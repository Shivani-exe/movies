import React, { Component } from 'react'
import './nav.css'
import {Link} from 'react-router-dom'

function Nav() {
    return (
      
    <nav className='nav-class'>
        {/* //Logo */}
        <h1><i>Movies</i></h1>
        <ul className='list'>
      <Link to='/'>          <li>Home</li></Link>
      <Link to='/movies'>    <li>Movies</li></Link>
      <Link to='/about'>     <li>About</li></Link>

        </ul>

    </nav>
    )
  }
  export default Nav
