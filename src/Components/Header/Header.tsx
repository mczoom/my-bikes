import React from 'react'
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.png'

export default function Header() {


  return (
    <header className='header'>
      <img src={logo} className='header__logo' alt='logo'></img>
      <Navigation />

    </header>

  )
}
