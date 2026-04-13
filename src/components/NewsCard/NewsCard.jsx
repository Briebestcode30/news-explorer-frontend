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
    } else {
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
  }

  function getIcon() {
    if (isSavedPage) {
      return isHovered ? trashIcon : trashLightIcon;
    }

    return isSaved ? bookmarkIcon : bookmarkLightIcon;
  }

  return (
    <article className="card">
      {/* IMAGE */}

      <div className="card__image-wrapper">
        <img
          className="card__image"
          src={article.urlToImage || backgroundImage}
          alt={article.title}
        />

        {/* KEYWORD */}

        {article.keyword && (
          <span className="card__keyword">{article.keyword}</span>
        )}

        {/* SAVE / DELETE BUTTON */}

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
          aria-label={isSavedPage ? "Delete article" : "Save article"}
        >
          <img
            src={getIcon()}
            alt={isSavedPage ? "Delete article" : "Save article"}
          />
        </button>
      </div>

      {/* CONTENT */}

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
