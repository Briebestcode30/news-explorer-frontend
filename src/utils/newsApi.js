const API_KEY = import.meta.env.VITE_API_KEY;

export function getNews(query) {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  const url = `https://nomoreparties.co/news/v2/everything?q=${query}&from=${fromDate.toISOString()}&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`;

  return fetch(url).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}
