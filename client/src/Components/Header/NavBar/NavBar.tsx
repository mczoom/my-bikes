import { NavLink } from 'react-router-dom';
import { NavigationLink } from 'types/NavigationLink';

interface NavigationProps {
  navLinks: NavigationLink[];
}

export default function Navigation({ navLinks }: NavigationProps) {
  return (
    <nav className="navigation">
      <ul className="navigation__nav-links">
        {navLinks.map((nav, i) => (
          <li key={i}>
            <NavLink to={nav.link} className="nav-links__link link">
              {nav.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
