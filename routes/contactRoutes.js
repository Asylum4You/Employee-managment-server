const express = require('express');
const { contactMessage } = require('../controller/contact.controller');

const router = express.Router();

router.post('/contact', contactMessage);

module.exports = router;