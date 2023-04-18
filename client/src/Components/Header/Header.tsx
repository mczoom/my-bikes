import React from 'react'
import Profile from '../Profile/Profile';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.png'
import AuthButton from '../AuthButton/AuthButton';
import AuthLink from '../AuthLink/AuthLink';
import { Outlet } from 'react-router-dom';



interface HeaderProps {
  isLoggedIn: boolean
  onLogout: () => void
}

export default function Header({isLoggedIn, onLogout}: HeaderProps) {


  return (
    <>
    <header className='header'>
      <div className='header__wrap'>
        <img src={logo} className='header__logo' alt='logo'></img>        
        <Profile />       
      </div> 
      {isLoggedIn ? (     
      <div className='header__nav-wrapper'>        
        <Navigation />     
        <div className='header__auth-buttons'>          
          <AuthButton text={'Выйти'} onClick={onLogout}/>
        </div>
      </div>
      ) : (
        <div className='header__nav-wrapper'>        
        <div className='header__auth-buttons not-logged-in'>   
               
          <AuthLink text={'Войти'} link={'/login'} />
          <AuthLink text={'Зарегистрироваться'} link={'/registration'} />
        </div>
      </div>
      )}
    </header>
    <Outlet />
    </>
  )
}
