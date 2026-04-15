import { useState, useEffect } from "react";

import {
  getNews,
  getSavedArticles,
  saveArticle,
  deleteArticle,
} from "../../utils/api";

import NewsCardList from "../NewsCardList/NewsCardList";

import "../../fonts/fonts.css";
import "../../index.css";
import "./Main.css";

import backgroundImage from "../../assets/backgroundpage.jpg";
import nothingFoundIcon from "../../assets/notfound.svg";

function Main({ isLoggedIn }) {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    getSavedArticles()
      .then((data) => setSavedArticles(data || []))
      .catch(() => setError(true));
  }, [isLoggedIn]);

  function handleSearch(e) {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setError(false);
    setHasSearched(true);
    setIsLoading(true);

    getNews(trimmedQuery)
      .then((data) => setArticles(data?.articles || []))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }

  function handleSave(article) {
    saveArticle({
      ...article,
      keyword: query.trim(),
    })
      .then(() => {
        getSavedArticles()
          .then((data) => setSavedArticles(data || []))
          .catch(() => setError(true));
      })
      .catch(() => setError(true));
  }

  function handleDelete(article) {
    deleteArticle(article)
      .then(() => {
        getSavedArticles()
          .then((data) => setSavedArticles(data || []))
          .catch(() => setError(true));
      })
      .catch(() => setError(true));
  }

  return (
    <>
      <section
        className="main"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="main__container">
          <div className="main__text">
            <h1 className="main__title">What's going on in the world?</h1>

            <p className="main__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
          </div>

          <form className="main__search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter topic"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="main__input"
            />

            <button type="submit" className="main__button">
              Search
            </button>
          </form>
        </div>
      </section>

      {isLoading && (
        <section className="results">
          <div className="results__container">
            <p>Loading...</p>
          </div>
        </section>
      )}

      {error && (
        <section className="results">
          <div className="results__container">
            <p>Something went wrong</p>
          </div>
        </section>
      )}

      {!isLoading && articles.length > 0 && (
        <NewsCardList
          articles={articles}
          savedArticles={savedArticles}
          onSave={handleSave}
          onDelete={handleDelete}
          isLoggedIn={isLoggedIn}
          isSavedPage={false}
        />
      )}

      {!isLoading && hasSearched && articles.length === 0 && (
        <section className="results">
          <div className="results__container">
            <img src={nothingFoundIcon} alt="Nothing found" />
            <p>No results found</p>
          </div>
        </section>
      )}
    </>
  );
}

export default Main;
