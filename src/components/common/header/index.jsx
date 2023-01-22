import { Link } from "react-router-dom";

import cn from "classnames";
import styles from "./Header.module.scss";

const Header = () => {
  // responvive menu toggle
  const toggleMenu = () => {
    const menu = document.querySelector(`.${styles.menu}`);
    menu.classList.toggle(styles.active);
  };

  return (
    <header className={cn(styles.header)}>
      <div className={cn(styles.top_header)}>
        <div className={cn(styles.left)}>
          <div className={cn(styles.lang)}>
            <i className="fa-solid fa-globe"></i>
          </div>
          <div className={cn(styles.logo)}>
            <img
              src="https://compareprivateplanes.com/images/site/cropped-logo-blue-1536x997.png"
              alt="logo"
            />
          </div>
        </div>
        <div className={cn(styles.right)}>
          <Link to="/login">Join Now</Link>
          <Link to="/logout">Sign in </Link>
        </div>
      </div>
      <nav className={cn(styles.nav)}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Search Aircraft</li>
          <li>
            <Link to="/aircraft-comparisons">Aircraft Comparisons</Link>
          </li>
          <li>
            <Link to="/basics">The Basics</Link>
          </li>
          <li>Engines</li>
          <li>Ways To Fly</li>
          <li>Free Tools</li>
          <li>
            <Link to="/premium">Premium</Link>
          </li>
          <li>
            <Link to="/premium">About</Link>
          </li>
          <li>
            <Link to="/premium">Contact</Link>
          </li>
        </ul>
      </nav>
      <nav className={cn(styles.responsive_menu)}>
        <div className={cn(styles.menu_icon)} onClick={() => toggleMenu()}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className={cn(styles.menu)}>
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>Search Aircraft</p>
          <p>
            <Link to="/aircraft-comparisons">Aircraft Comparisons</Link>
          </p>
          <p>
            <Link to="/basics">The Basics</Link>
          </p>
          <p>Engines</p>
          <p>Ways To Fly</p>
          <p>Free Tools</p>
          <p>
            <Link to="/premium">Premium</Link>
          </p>
          <p>
            <Link to="/premium">About</Link>
          </p>
          <p>
            <Link to="/premium">Contact</Link>
          </p>
        </div>
      </nav>
      <div className={cn(styles.responsive_menu)}></div>
    </header>
  );
};

export default Header;
