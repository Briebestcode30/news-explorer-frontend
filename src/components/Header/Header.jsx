import { Link, useLocation } from "react-router-dom";
import "./Header.css";

import logoutIcon from "../../assets/logout.svg";

function Header({ onLoginClick, isLoggedIn, onLogout, user }) {
  const location = useLocation();

  const isSavedPage = location.pathname === "/saved-news";

  return (
    <header className="header">
      <div className="header__container">
        <Link
          to="/"
          className={`header__logo ${isSavedPage ? "header__logo--light" : ""}`}
        >
          News Explorer
        </Link>

        <nav className="header__nav">
          {/* HOME LINK */}

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
          >
            Home
          </Link>

          {/* SAVED ARTICLES LINK */}

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
            >
              Saved articles
            </Link>
          )}

          {/* AUTH BUTTON */}

          {isLoggedIn ? (
            <button
              type="button"
              className={`header__button header__logout-btn ${
                isSavedPage ? "header__button--light" : ""
              }`}
              onClick={onLogout}
              aria-label="Log out"
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
              aria-label="Sign in"
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
