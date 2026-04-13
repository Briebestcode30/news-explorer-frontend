import { useEffect, useState } from "react";

import "./SavedNews.css";

import { getSavedArticles, deleteArticle } from "../../utils/api";

import NewsCardList from "../../components/NewsCardList/NewsCardList";

function SavedNews({ user }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

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

  return (
    <main className="saved-news">
      {/* HEADER TEXT SECTION */}

      <section className="saved-news__header">
        <p className="saved-news__subtitle">Saved articles</p>

        <h1 className="saved-news__title">
          {user?.name || "User"}, you have {articles.length} saved articles
        </h1>

        <p className="saved-news__keywords">
          By keywords: Nature, Yellowstone, and 2 other
        </p>
      </section>

      {/* CARDS SECTION */}

      <section className="saved-news__content">
        <div className="saved-news__cards-container">
          {articles.length === 0 ? (
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
