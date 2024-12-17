import express from 'express';
import cors from 'cors';
import path from 'path';
import { handleRss } from './routes/rss.js';
import { handleLogin } from './routes/auth.js';
import { handleHealth } from './routes/health.js';
import { handleGetArticles, handlePostArticles } from './routes/articles.js';
import { handleGetRssFeeds, handlePostRssFeeds, handleDeleteRssFeed } from './routes/rss-feeds.js';
import { handleGetServices, handlePostServices } from './routes/services.js';

const app = express();
const port = process.env.PORT || 3001;

// Specific CORS configuration for by1.net
const ALLOWED_ORIGINS = [
  'https://by1.net',
  'https://www.by1.net',
  'http://localhost:3000' // For development
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));

app.use(express.json());

// Add security headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// RSS Feeds endpoint
app.get('/rss', handleRss);

// Auth endpoint
app.post('/auth/login', handleLogin);

// Health check endpoint
app.get('/health', handleHealth);

// Articles endpoint
app.get('/articles', handleGetArticles);
app.post('/articles', handlePostArticles);

// RSS Feeds Management
app.get('/rss-feeds', handleGetRssFeeds);
app.post('/rss-feeds', handlePostRssFeeds);
app.delete('/rss-feeds/:id', handleDeleteRssFeed);

// Services Management
app.get('/services', handleGetServices);
app.post('/services', handlePostServices);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
