import { useState, useEffect } from "react";

import {
  getNews,
  getSavedArticles,
  saveArticle,
  deleteArticle,
} from "../../utils/api";

import NewsCardList from "../NewsCardList/NewsCardList";

import "./Main.css";

import backgroundImage from "../../assets/backgroundpage.jpg";
import nothingFoundIcon from "../../assets/notfound.svg";

function Main({ isLoggedIn }) {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSavedArticles();
  }, []);

  function loadSavedArticles() {
    getSavedArticles()
      .then((data) => {
        setSavedArticles(data);
      })
      .catch(console.error);
  }

  function handleSearch(e) {
    e.preventDefault();

    setHasSearched(true);
    setIsLoading(true);

    getNews(query)
      .then((data) => {
        setArticles(data.articles);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSave(article) {
    saveArticle(article)
      .then(() => loadSavedArticles())
      .catch(console.error);
  }

  function handleDelete(article) {
    deleteArticle(article)
      .then(() => loadSavedArticles())
      .catch(console.error);
  }

  return (
    <>
      {/* HERO */}

      <section
        className="main"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="main__container">
          {/* HERO TEXT */}

          <div className="main__text">
            <h1 className="main__title">What's going on in the world?</h1>

            <p className="main__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
          </div>

          {/* SEARCH */}

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

      {/* PRELOADER */}

      {isLoading && (
        <section className="results">
          <div className="results__container">
            <div className="main__preloader">
              <div className="main__spinner"></div>

              <p className="main__loading-text">Searching for news...</p>
            </div>
          </div>
        </section>
      )}

      {/* RESULTS */}

      {!isLoading && articles.length > 0 && (
        <section className="results">
          <div className="results__container">
            <NewsCardList
              articles={articles}
              savedArticles={savedArticles}
              onSave={handleSave}
              onDelete={handleDelete}
              isLoggedIn={isLoggedIn}
              isSavedPage={false}
            />
          </div>
        </section>
      )}

      {/* NOTHING FOUND */}

      {!isLoading && hasSearched && articles.length === 0 && (
        <section className="results">
          <div className="results__container">
            <div className="main__not-found">
              <img
                src={nothingFoundIcon}
                alt="Nothing found"
                className="main__not-found-image"
              />

              <h2 className="main__not-found-title">Nothing found</h2>

              <p className="main__not-found-text">
                Sorry, but nothing matched your search terms.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Main;
