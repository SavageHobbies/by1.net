export const handleHealth = (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
};
