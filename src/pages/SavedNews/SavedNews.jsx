import { useEffect, useState } from "react";

import "./SavedNews.css";

import { getSavedArticles, deleteArticle } from "../../utils/api";

import NewsCardList from "../../components/NewsCardList/NewsCardList";

function SavedNews({ user }) {
  const [articles, setArticles] = useState([]);

  function loadArticles() {
    getSavedArticles()
      .then((data) => {
        setArticles(data || []);
      })
      .catch((err) => {
        console.error("Failed to load saved articles:", err);
      });
  }

  useEffect(() => {
    if (user) {
      loadArticles();
    }
  }, [user]);

  function handleDelete(article) {
    deleteArticle(article)
      .then(() => {
        loadArticles();
      })
      .catch((err) => {
        console.error("Failed to delete article:", err);
      });
  }

  function getKeywordsText() {
    const keywords = [
      ...new Set(articles.map((article) => article.keyword).filter(Boolean)),
    ];

    if (keywords.length === 0) return "";

    if (keywords.length === 1) {
      return keywords[0];
    }

    if (keywords.length === 2) {
      return `${keywords[0]} and ${keywords[1]}`;
    }

    return `${keywords[0]}, ${keywords[1]}, and ${
      keywords.length - 2
    } other${keywords.length - 2 > 1 ? "s" : ""}`;
  }

  const articleCount = articles.length;

  return (
    <main className="saved-news">
      <section className="saved-news__header" aria-live="polite">
        <p className="saved-news__subtitle">Saved articles</p>

        <h1 className="saved-news__title">
          {user?.name || "User"}, you have {articleCount} saved{" "}
          {articleCount === 1 ? "article" : "articles"}
        </h1>

        {articleCount > 0 && (
          <p className="saved-news__keywords">
            By keywords: {getKeywordsText()}
          </p>
        )}
      </section>

      <section className="saved-news__content">
        <div className="saved-news__cards-container">
          {articleCount === 0 ? (
            <p className="saved-news__text">No saved articles yet.</p>
          ) : (
            <NewsCardList
              articles={articles}
              savedArticles={articles}
              onDelete={handleDelete}
              onSave={() => {}}
              isLoggedIn={true}
              isSavedPage={true}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default SavedNews;
