import Profile from 'components/Header/Profile/Profile';
import Navigation from 'components/Header/NavBar/NavBar';
import logo from 'assets/images/logo.png'
import AuthButton from 'ui/AuthButton/AuthButton';
import HeaderAuthLinks from 'components/Header/HeaderAuthLinks/HeaderAuthLinks';
import { Link } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { Profile as ProfileType } from 'types/Profile';
import { Activity } from 'types/Activity';


interface HeaderProps {
  setUser: (user: ProfileType) => void
  setAllActivities: (activities: Activity[]) => void
}

export default function Header({setUser, setAllActivities}: HeaderProps) {

  const auth = useAuth();
const isLoggedIn = auth.appToken;
const hasAccessToStrava = auth.stravaToken;


  function logout() {
    auth.logout();
    setUser({} as ProfileType);
    setAllActivities([] as Activity[]);
  };

  return (
    <header className='header'>
      <div className='header__wrap'>
        <Link to='/'>
          <img src={logo} className='header__logo' alt='Логотип приложения'></img>      
        </Link>  
        <Profile />       
      </div> 
      {isLoggedIn && hasAccessToStrava ? (     
      <div className='header__nav-wrapper'>        
        <Navigation />     
        <div className='header__auth-buttons'>          
          <AuthButton text={'Выйти'} onClick={logout}/>
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
