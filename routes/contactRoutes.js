const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

// Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contact' });
  }
});

// Create new contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Error creating contact' });
  }
});

// Update contact
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Error updating contact' });
  }
});

// Delete contact
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

module.exports = router;
