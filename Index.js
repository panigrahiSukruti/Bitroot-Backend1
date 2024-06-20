const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { getContacts, getContactById, createContact, updateContact, deleteContact } = require('../bitroot-backend/controllers/Contacts'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3001; // Changed port to 3001 to avoid conflict

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/contacts', getContacts);
app.get('/contacts/:id', getContactById);
app.post('/contacts', createContact);
app.put('/contacts/:id', updateContact);
app.delete('/contacts/:id', deleteContact);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
