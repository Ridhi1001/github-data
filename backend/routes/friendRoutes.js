const express = require('express');
const { findAndSaveMutualFriends } = require('../controllers/friendController');
const router = express.Router();

// Endpoint: Find and save mutual friends for a user
router.post('/:username/mutual-friends', findAndSaveMutualFriends);

module.exports = router;
