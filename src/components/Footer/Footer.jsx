import "./Footer.css";

import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2026 Supersite, Powered by News API
        </p>

        <div className="footer__nav">
          <div className="footer__links">
            <a href="/" className="footer__link">
              Home
            </a>

            <a
              href="https://tripleten.com"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              TripleTen
            </a>
          </div>

          <div className="footer__social">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <img src={githubIcon} alt="GitHub" className="footer__icon" />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="footer__icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
