import { useState, useEffect } from "react";

import "./NewsCardList.css";

import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  articles = [],
  savedArticles = [],
  onSave,
  onDelete,
  isLoggedIn,
  isSavedPage,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function isArticleSaved(article) {
    return savedArticles.some(
      (saved) => saved.title === article.title || saved.link === article.url,
    );
  }

  function handleShowMore() {
    let increment;

    if (window.innerWidth <= 640) {
      increment = 2;
    } else if (window.innerWidth <= 1024) {
      increment = 2;
    } else {
      increment = 3;
    }

    setVisibleCount((prev) => prev + increment);
  }

  const articlesToDisplay = isSavedPage
    ? articles
    : articles.slice(0, visibleCount);

  return (
    <section className="cards">
      {!isSavedPage && articles.length > 0 && (
        <h2 className="cards__title">Search results</h2>
      )}

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
