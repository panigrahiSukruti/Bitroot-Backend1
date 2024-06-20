const Contact = require('./Contacts'); // Adjust the path as necessary

// Get all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get contact by ID
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new contact
const createContact = async (req, res) => {
    try {
        const { name, number } = req.body;
        const newContact = new Contact({ name, number });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Name or number already exists' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

// Update contact by ID
const updateContact = async (req, res) => {
    try {
        const { name, number } = req.body;
        const contact = await Contact.findByIdAndUpdate(req.params.id, { name, number }, { new: true });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete contact by ID
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};