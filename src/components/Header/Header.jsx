import { Link, useLocation } from "react-router-dom";
import "./Header.css";

import logoutIcon from "../../assets/logout.svg";

function Header({ onLoginClick, isLoggedIn, onLogout, user }) {
  const location = useLocation();

  const isSavedPage = location.pathname === "/saved-news";

  return (
    <header className={`header ${isSavedPage ? "header_theme_light" : ""}`}>
      <div className="header__container">
        <h1 className="header__logo">News Explorer</h1>

        <nav className="header__nav">
          <Link
            to="/"
            className={`header__link ${
              location.pathname === "/" ? "header__link_active" : ""
            }`}
          >
            Home
          </Link>

          {isLoggedIn && (
            <Link
              to="/saved-news"
              className={`header__link ${
                location.pathname === "/saved-news" ? "header__link_active" : ""
              }`}
            >
              Saved Articles
            </Link>
          )}

          {isLoggedIn ? (
            <button
              className="header__button header__logout-btn"
              onClick={onLogout}
            >
              {user?.name || "User"}

              <img
                src={logoutIcon}
                alt="logout"
                className="header__logout-icon"
              />
            </button>
          ) : (
            <button className="header__button" onClick={onLoginClick}>
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
