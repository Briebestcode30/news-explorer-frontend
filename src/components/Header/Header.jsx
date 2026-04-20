import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

import logoutIcon from "../../assets/logout.svg";
import menuIcon from "../../assets/menu.svg";
import closeIcon from "../../assets/close.svg";

function Header({ onLoginClick, isLoggedIn, onLogout, user }) {
  const location = useLocation();

  const isSavedPage = location.pathname === "/saved-news";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link
          to="/"
          className={`header__logo ${isSavedPage ? "header__logo--light" : ""}`}
        >
          News Explorer
        </Link>

        {/* HAMBURGER BUTTON */}

        <button
          className={`header__menu-button ${
            isSavedPage ? "header__menu-button--light" : ""
          }`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <img
            src={isMenuOpen ? closeIcon : menuIcon}
            alt="Menu icon"
            className="header__menu-icon"
          />
        </button>

        <nav className={`header__nav ${isMenuOpen ? "header__nav_open" : ""}`}>
          <Link
            to="/"
            className={`header__link
              ${isSavedPage ? "header__link--light" : ""}
              ${
                location.pathname === "/"
                  ? isSavedPage
                    ? "header__link_active--light"
                    : "header__link_active"
                  : ""
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          {isLoggedIn && (
            <Link
              to="/saved-news"
              className={`header__link
                ${isSavedPage ? "header__link--light" : ""}
                ${
                  location.pathname === "/saved-news"
                    ? isSavedPage
                      ? "header__link_active--light"
                      : "header__link_active"
                    : ""
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Saved articles
            </Link>
          )}

          {isLoggedIn ? (
            <button
              type="button"
              className={`header__button header__logout-btn ${
                isSavedPage ? "header__button--light" : ""
              }`}
              onClick={onLogout}
            >
              {user?.name || "User"}

              <img
                src={logoutIcon}
                alt="Logout icon"
                className={`header__logout-icon ${
                  isSavedPage ? "header__logout-icon--light" : ""
                }`}
              />
            </button>
          ) : (
            <button
              type="button"
              className={`header__button ${
                isSavedPage ? "header__button--light" : ""
              }`}
              onClick={onLoginClick}
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
