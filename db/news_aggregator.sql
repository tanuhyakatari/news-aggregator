CREATE DATABASE IF NOT EXISTS news_aggregator;
USE news_aggregator;

CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(2083),
    urlToImage VARCHAR(2083),
    publishedAt DATETIME,
    sourceName VARCHAR(255)
);
