import { useEffect, useState } from "react";

import "./SavedNews.css";

import { getSavedArticles, deleteArticle } from "../../utils/api";

import NewsCardList from "../../components/NewsCardList/NewsCardList";

function SavedNews({ user }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, [user]);

  function loadArticles() {
    getSavedArticles()
      .then((data) => {
        setArticles(data);
      })
      .catch(console.error);
  }

  function handleDelete(article) {
    deleteArticle(article)
      .then(() => {
        loadArticles();
      })
      .catch(console.error);
  }

  function getKeywordsText() {
    const keywords = [...new Set(articles.map((article) => article.keyword))];

    if (keywords.length === 0) return "";

    if (keywords.length === 1) {
      return keywords[0];
    }

    if (keywords.length === 2) {
      return `${keywords[0]} and ${keywords[1]}`;
    }

    return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} other`;
  }

  const articleCount = articles.length;

  return (
    <main className="saved-news">
      {}

      <section className="saved-news__header">
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

      {}

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
