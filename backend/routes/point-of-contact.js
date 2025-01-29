import express from 'express';
import { PointOfContact } from '../models/PointOfContact';
import { validatePointOfContact } from '../middleware/validation';

const router = express.Router();

// Get all points of contact with search
router.get('/', async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = {};
    
    // Search across name, position, and email fields
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await PointOfContact
      .find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ name: 1 });

    const total = await PointOfContact.countDocuments(query);

    res.json({
      contacts,
      total,
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch points of contact' });
  }
});

// Get single point of contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await PointOfContact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// Create new point of contact
router.post('/', validatePointOfContact, async (req, res) => {
  try {
    const contact = new PointOfContact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create contact' });
  }
});

// Update point of contact
router.put('/:id', validatePointOfContact, async (req, res) => {
  try {
    const contact = await PointOfContact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update contact' });
  }
});

// Delete point of contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await PointOfContact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete contact' });
  }
});

export default router;
