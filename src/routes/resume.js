const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.post('/parse', resumeController.parseResume);
router.post('/extract-keywords', resumeController.extractKeywords);

module.exports = router;