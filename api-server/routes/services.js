import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesPath = path.join(__dirname, '..', 'data', 'services.json');

export const handleGetServices = async (req, res) => {
  try {
    const services = JSON.parse(await fs.readFile(servicesPath, 'utf-8'));
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

export const handlePostServices = async (req, res) => {
  try {
    const newService = req.body;
    const services = JSON.parse(await fs.readFile(servicesPath, 'utf-8'));
    services.push(newService);
    await fs.writeFile(servicesPath, JSON.stringify(services, null, 2));
    res.status(201).json({ message: 'Service added successfully' });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ error: 'Failed to add service' });
    }
};
