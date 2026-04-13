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
      {/* Title only on main search results page */}
      {!isSavedPage && articles.length > 0 && (
        <h2 className="cards__title">Search results</h2>
      )}

      {/* GRID CONTAINER — fixes stacking */}
      <div className="cards__list">
        {articlesToDisplay.map((article) => (
          <NewsCard
            key={article._id || article.url}
            article={article}
            onSave={onSave}
            onDelete={onDelete}
            isSaved={isArticleSaved(article)}
            isLoggedIn={isLoggedIn}
            isSavedPage={isSavedPage}
          />
        ))}
      </div>

      {/* Show More button only on main page */}
      {!isSavedPage && visibleCount < articles.length && (
        <div className="cards__actions">
          <button className="cards__button" onClick={handleShowMore}>
            Show more
          </button>
        </div>
      )}
    </section>
  );
}

export default NewsCardList;
