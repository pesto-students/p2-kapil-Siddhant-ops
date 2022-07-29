import { Link, NavLink } from "react-router-dom";
import navStyles from "../Styles/Nav.module.scss";

const Navbar = () => {
  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  return (
    <nav className={navStyles.nav}>
      <div className={navStyles.logoContainer}>
        <h1>
          <Link to={"/"}>Shortly</Link>
        </h1>
      </div>
      <div className={navStyles.menu}>
        <input type="checkbox" id="hamburger" />
        <label htmlFor="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className={navStyles.menuContainer}>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? navStyles.activeLink : undefined
                  }
                  to={link.link}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
