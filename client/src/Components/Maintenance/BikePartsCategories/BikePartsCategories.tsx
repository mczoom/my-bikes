import { NavLink } from 'react-router-dom';
import { NavigationLink } from 'types/NavigationLink';

interface BikePartsCategoriesProps {
  navLinks: NavigationLink[];
}

export default function BikePartsCategories({ navLinks }: BikePartsCategoriesProps) {
  return (
    <nav className="navigation">
      <ul className="navigation__nav-links navigation__nav-links_column">
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
