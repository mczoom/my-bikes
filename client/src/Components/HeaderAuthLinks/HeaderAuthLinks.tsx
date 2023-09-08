import { useLocation } from 'react-router-dom';
import AuthLink from '../AuthLink/AuthLink';


export default function HeaderAuthLinks() { 

  const location = useLocation();    

  return (         
    <div className='header__auth-buttons not-logged-in'>               
        {location.pathname === '/registration' && <AuthLink text={'Войти'} link={'/login'} />}
        {location.pathname === '/login' && <AuthLink text={'Зарегистрироваться'} link={'/registration'} />}
    </div>    
  )
}