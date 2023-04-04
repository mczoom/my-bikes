import React from 'react'
import Profile from '../Profile/Profile';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.png'
import AuthButton from '../AuthButton/AuthButton';


interface HeaderProps {
  isLoggedIn: boolean
  onLogout: () => void
}

export default function Header({isLoggedIn, onLogout}: HeaderProps) {


  return (
    <header className='header'>
      <div className='header__wrap'>
        <img src={logo} className='header__logo' alt='logo'></img>        
        <Profile />       
      </div> 
      {isLoggedIn ? (     
      <div className='header__nav-wrapper'>        
        <Navigation />     
        <div className='header__auth-buttons'>          
          <AuthButton text={'Выйти'} onLogout={onLogout}/>
        </div>
      </div>
      ) : (
        <div className='header__nav-wrapper'>        
        <div className='header__auth-buttons not-logged-in'>          
          <AuthButton text={'Войти'} onLogout={onLogout}/>
          <AuthButton text={'Зарегистрироваться'} onLogout={onLogout}/>
        </div>
      </div>
      )}
    </header>

  )
}
