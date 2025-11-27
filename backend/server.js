const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tanuhya@2006',
  database: 'news_aggregator'
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

const API_KEY = '7f8940053a674ff280a5ac692a63462c';

app.get('/fetch-news', async (req, res) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`;
  try {
    const response = await axios.get(url);
    const articles = response.data.articles;

    articles.forEach(article => {
      const { title, description, url, urlToImage, publishedAt, source } = article;
      const query = 'INSERT INTO articles (title, description, url, urlToImage, publishedAt, sourceName) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(query, [title, description, url, urlToImage, new Date(publishedAt), source.name], err => {
        if (err) console.error('Insert error:', err);
      });
    });

    res.json({ message: 'News fetched and saved.' });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).send('Error fetching news');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
