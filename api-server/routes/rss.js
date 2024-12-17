import Parser from 'rss-parser';

const parser = new Parser();

export const handleRss = async (req, res) => {
  try {
    const RSS_FEEDS = [
      'https://feeds.feedburner.com/venturebeat/SZYF',
      'https://www.artificialintelligence-news.com/feed/',
      'https://www.unite.ai/feed/'
    ];

    const feedPromises = RSS_FEEDS.map(feed => parser.parseURL(feed));
    const feeds = await Promise.all(feedPromises);
    const allItems = feeds.flatMap(feed => feed.items);
    
    const sortedItems = allItems.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });
    
    res.json({ items: sortedItems.slice(0, 10) });
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feeds' });
  }
};
