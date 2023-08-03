import React from 'react'
import Profile from '../Profile/Profile';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.png'
import AuthButton from '../AuthButton/AuthButton';
import HeaderAuthLinks from '../HeaderAuthLinks/HeaderAuthLinks';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';



export default function Header() {

  const auth = useAuth();

  return (
    <header className='header'>
      <div className='header__wrap'>
        <Link to='/'>
          <img src={logo} className='header__logo' alt='Логотип приложения'></img>      
        </Link>  
        <Profile />       
      </div> 
      {auth.isLoggedIn && auth.isConnectedToStrava ? (     
      <div className='header__nav-wrapper'>        
        <Navigation />     
        <div className='header__auth-buttons'>          
          <AuthButton text={'Выйти'} onClick={auth.logout}/>
        </div>
      </div>
      ) : (
        <div className='header__nav-wrapper'>        
          <HeaderAuthLinks />
        </div>
      )}
    </header>   
  )
}
