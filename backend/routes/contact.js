const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');

// Ruta pública para enviar mensajes
router.post('/', validateContact, contactController.createContact);

module.exports = router;