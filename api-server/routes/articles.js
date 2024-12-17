import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesPath = path.join(__dirname, '..', 'data', 'articles.json');

export const handleGetArticles = async (req, res) => {
  try {
    const articles = JSON.parse(await fs.readFile(articlesPath, 'utf-8'));
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

export const handlePostArticles = async (req, res) => {
    try {
      const newArticle = req.body;
      const articles = JSON.parse(await fs.readFile(articlesPath, 'utf-8'));
      articles.push(newArticle);
      await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
      res.status(201).json({ message: 'Article saved successfully' });
    } catch (error) {
      console.error('Error saving article:', error);
      res.status(500).json({ error: 'Failed to save article' });
    }
  };
