import { NavLink } from 'react-router-dom';
import { NavigationLink } from 'types/NavigationLink';

interface BikePartsCategoriesProps {
  navLinks: NavigationLink[];
}

export default function BikePartsCategories({ navLinks }: BikePartsCategoriesProps) {
  return (
    <nav className="nav-column">
      <ul className="nav-column__links">
        {navLinks.map((nav, i) => (
          <li className="links__item" key={i}>
            <NavLink to={nav.link} className="links__link link">
              {nav.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
