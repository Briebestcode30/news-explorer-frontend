import { useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  articles,
  savedArticles = [],
  onSave,
  onDelete,
  isLoggedIn,
  isSavedPage,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  function isArticleSaved(article) {
    return savedArticles.some((saved) => saved.title === article.title);
  }

  function handleShowMore() {
    setVisibleCount((prev) => prev + 3);
  }

  const articlesToDisplay = isSavedPage
    ? articles
    : articles.slice(0, visibleCount);

  return (
    <section className="cards">
      {/* TITLE */}

      {!isSavedPage && articles.length > 0 && (
        <h2 className="cards__title">Search results</h2>
      )}

      {/* CARD LIST */}

      <ul className="cards__list">
        {articlesToDisplay.map((article, index) => (
          <li key={article._id || article.url || index} className="cards__item">
            <NewsCard
              article={article}
              onSave={onSave}
              onDelete={onDelete}
              isSaved={isArticleSaved(article)}
              isLoggedIn={isLoggedIn}
              isSavedPage={isSavedPage}
            />
          </li>
        ))}
      </ul>

      {/* SHOW MORE BUTTON */}

      {!isSavedPage && visibleCount < articles.length && (
        <div className="cards__actions">
          <button
            type="button"
            className="cards__button"
            onClick={handleShowMore}
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
}

export default NewsCardList;
