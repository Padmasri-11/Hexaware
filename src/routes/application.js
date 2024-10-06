const express = require('express');
const applicationController = require('../controllers/applicationController');
const router = express.Router();

router.post('/submit', applicationController.submitApplication);

module.exports = router;
