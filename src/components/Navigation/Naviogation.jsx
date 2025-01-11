import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from './Naigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
    return (
        <nav className={css.navigation}>
            <NavLink to="/" className={buildLinkClass} >
                Home
            </NavLink>
            <NavLink to="/movies" className={buildLinkClass} >
                Movies
            </NavLink>
        </nav>
    );
}