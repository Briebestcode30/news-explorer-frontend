const API_KEY = import.meta.env.VITE_API_KEY;

const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

/* ================================
   GET NEWS FROM API
================================ */

export function getNews(query) {
  const toDate = new Date();

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  const url =
    `${newsApiBaseUrl}?` +
    `q=${encodeURIComponent(query)}` +
    `&from=${fromDate.toISOString()}` +
    `&to=${toDate.toISOString()}` +
    `&pageSize=100` +
    `&apiKey=${API_KEY}`;

  return fetch(url).then(handleResponse);
}

/* ================================
   RESPONSE HANDLER
================================ */

function handleResponse(res) {
  if (res.ok) return res.json();

  return res
    .json()
    .then((data) => Promise.reject(data.message || `Error: ${res.status}`))
    .catch(() => Promise.reject(`Error: ${res.status}`));
}

/* ================================
   AUTH (Mock)
================================ */

export function register({ name, email, password }) {
  const user = { name, email, password };

  localStorage.setItem("mockUser", JSON.stringify(user));

  return Promise.resolve({
    message: "User registered successfully",
  });
}

export function login({ email, password }) {
  const storedUser = JSON.parse(
    localStorage.getItem("mockUser")
  );

  if (
    !storedUser ||
    storedUser.email !== email ||
    storedUser.password !== password
  ) {
    return Promise.reject("Invalid email or password");
  }

  localStorage.setItem("jwt", "mock-jwt-token");

  return Promise.resolve({
    token: "mock-jwt-token",
  });
}

export function checkToken() {
  const storedUser = JSON.parse(
    localStorage.getItem("mockUser")
  );

  if (!storedUser) {
    return Promise.reject("User not found");
  }

  return Promise.resolve(storedUser);
}

export function getUserInfo() {
  const storedUser = JSON.parse(
    localStorage.getItem("mockUser")
  );

  if (!storedUser) {
    return Promise.reject("User not found");
  }

  return Promise.resolve(storedUser);
}

/* ================================
   SAVED ARTICLES
================================ */

export function getSavedArticles() {
  const articles =
    JSON.parse(localStorage.getItem("savedArticles")) || [];

  return Promise.resolve(articles);
}

export function saveArticle(article) {
  const articles =
    JSON.parse(localStorage.getItem("savedArticles")) || [];

  const alreadySaved = articles.some(
    (item) => item.title === article.title
  );

  if (alreadySaved) {
    return Promise.resolve(article);
  }

  /* ✅ FIXED: guarantee description exists */

  const articleToSave = {
    keyword: article.keyword || "General",

    title: article.title || "Untitled article",

    description:
      article.description ||
      article.content ||
      article.text ||
      "No description available",

    publishedAt: article.publishedAt,

    source:
      article.source?.name ||
      article.source ||
      "Unknown source",

    url: article.url,

    urlToImage:
      article.urlToImage ||
      article.image ||
      "",
  };

  articles.push(articleToSave);

  localStorage.setItem(
    "savedArticles",
    JSON.stringify(articles)
  );

  return Promise.resolve(articleToSave);
}

export function deleteArticle(articleToDelete) {
  const articles =
    JSON.parse(localStorage.getItem("savedArticles")) || [];

  const updatedArticles = articles.filter(
    (article) =>
      article.title !== articleToDelete.title
  );

  localStorage.setItem(
    "savedArticles",
    JSON.stringify(updatedArticles)
  );

  return Promise.resolve();
}