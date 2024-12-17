import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rssFeedsPath = path.join(__dirname, '..', 'data', 'rss-feeds.json');

export const handleGetRssFeeds = async (req, res) => {
  try {
    const rssFeeds = JSON.parse(await fs.readFile(rssFeedsPath, 'utf-8'));
    res.json(rssFeeds);
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feeds' });
  }
};

export const handlePostRssFeeds = async (req, res) => {
  try {
    const newFeed = req.body;
    const rssFeeds = JSON.parse(await fs.readFile(rssFeedsPath, 'utf-8'));
    rssFeeds.push(newFeed);
    await fs.writeFile(rssFeedsPath, JSON.stringify(rssFeeds, null, 2));
    res.status(201).json({ message: 'RSS feed added successfully' });
  } catch (error) {
    console.error('Error adding RSS feed:', error);
    res.status(500).json({ error: 'Failed to add RSS feed' });
  }
};

export const handleDeleteRssFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const rssFeeds = JSON.parse(await fs.readFile(rssFeedsPath, 'utf-8'));
    const updatedFeeds = rssFeeds.filter((feed, index) => index !== parseInt(id));
    await fs.writeFile(rssFeedsPath, JSON.stringify(updatedFeeds, null, 2));
    res.json({ message: 'RSS feed deleted successfully' });
  } catch (error) {
    console.error('Error deleting RSS feed:', error);
    res.status(500).json({ error: 'Failed to delete RSS feed' });
  }
};
