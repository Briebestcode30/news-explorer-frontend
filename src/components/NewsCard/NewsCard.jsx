import { useState } from "react";

import "./NewsCard.css";

import bookmarkIcon from "../../assets/bookmark.svg";
import bookmarkLightIcon from "../../assets/bookmarklight.svg";

import trashIcon from "../../assets/trash.svg";
import trashLightIcon from "../../assets/trashlight.svg";

import backgroundImage from "../../assets/backgroundpage.jpg";

function NewsCard({
  article,
  onSave,
  onDelete,
  isSaved,
  isLoggedIn,
  isSavedPage,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  function handleClick() {
    if (isSavedPage) {
      onDelete(article);
      return;
    }

    if (!isLoggedIn) {
      alert("Please sign in to save articles");
      return;
    }

    if (isSaved) {
      onDelete(article);
    } else {
      onSave(article);
    }
  }

  function getIcon() {
    if (isSavedPage) {
      return isHovered ? trashIcon : trashLightIcon;
    }

    return isSaved ? bookmarkIcon : bookmarkLightIcon;
  }

  function getTooltipText() {
    if (!isLoggedIn) {
      return "Sign in to save articles";
    }

    if (isSavedPage) {
      return "Remove from saved";
    }

    if (isSaved) {
      return "Remove from saved";
    }

    return "Save article";
  }

  return (
    <article className="card">
      <div className="card__image-wrapper">
        <img
          className="card__image"
          src={article.urlToImage || backgroundImage}
          alt={article.title}
        />

        {/* Keyword label (required on saved page) */}
        {isSavedPage && article.keyword && (
          <span className="card__keyword">{article.keyword}</span>
        )}

        {/* Hover tooltip */}
        {isHovered && <span className="card__tooltip">{getTooltipText()}</span>}

        <button
          className={
            isSavedPage
              ? "card__delete-btn"
              : `card__save-btn ${isSaved ? "card__save-btn_saved" : ""}`
          }
          type="button"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={getTooltipText()}
        >
          <img src={getIcon()} alt={getTooltipText()} />
        </button>
      </div>

      <div className="card__content">
        <p className="card__date">{formattedDate}</p>

        <h3 className="card__title">{article.title}</h3>

        <p className="card__description">{article.description}</p>

        <a
          className="card__link"
          href={article.url}
          target="_blank"
          rel="noreferrer"
        >
          Read more
        </a>

        <p className="card__source">{article.source?.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;
