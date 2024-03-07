import Profile from 'components/Header/Profile/Profile';
import Navigation from 'components/Header/NavBar/NavBar';
import logo from 'assets/images/logo.png';
import AuthButton from 'ui/AuthButton/AuthButton';
import HeaderAuthLinks from 'components/Header/HeaderAuthLinks/HeaderAuthLinks';
import { Link } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { NavigationLink } from 'types/NavigationLink';

interface HeaderProps {
  handleReset: () => void;
}

export default function Header({ handleReset }: HeaderProps) {
  const auth = useAuth();
  const isLoggedIn = auth.appToken;
  const hasAccessToStrava = auth.stravaToken;

  const navLinks: NavigationLink[] = [
    {
      title: 'Тренировки',
      link: '/stats'
    },
    {
      title: 'Велосипеды',
      link: '/garage'
    },
    {
      title: 'Техобслуживание',
      link: '/maintenance'
    }
  ];

  function logout() {
    auth.logout();
    handleReset();
  }

  return (
    <header className="header">
      <div className="header__wrap">
        <Link to="/">
          <img src={logo} className="header__logo" alt="Логотип приложения"></img>
        </Link>
        <Profile />
      </div>
      {isLoggedIn && hasAccessToStrava ? (
        <div className="header__nav-wrapper">
          <Navigation navLinks={navLinks} />
          <div className="header__auth-buttons">
            <AuthButton text={'Выйти'} onClick={logout} />
          </div>
        </div>
      ) : (
        <div className="header__nav-wrapper">
          <HeaderAuthLinks />
        </div>
      )}
    </header>
  );
}
