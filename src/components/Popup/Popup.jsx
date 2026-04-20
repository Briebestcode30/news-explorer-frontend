import { useEffect } from "react";
import "./Popup.css";

import closeIcon from "../../assets/close.svg";

function Popup({ isOpen, onClose, children }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div className="popup__content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={closeIcon} alt="Close" className="popup__close-icon" />
        </button>

        {children}
      </div>
    </div>
  );
}

export default Popup;
