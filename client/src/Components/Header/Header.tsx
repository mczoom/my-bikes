import React from 'react'
import Profile from '../Profile/Profile';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.png'
import LogoutButton from '../LogoutButton/LogoutButton';


interface HeaderProps {
  onLogout: () => void
}

export default function Header({onLogout}: HeaderProps) {


  return (
    <header className='header'>
      <div className='header__wrap'>
        <img src={logo} className='header__logo' alt='logo'></img>        
        <Profile />       
      </div>
      <div className='header__auth-buttons'>
        <LogoutButton onLogout={onLogout}/>
      </div>
      <div className='header__nav-wrapper'>
        <Navigation />      
      </div>
    </header>

  )
}
