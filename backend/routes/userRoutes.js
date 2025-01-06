const express = require('express');
const { addUserFromGithub, searchUsers, updateUser, softDeleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/github', addUserFromGithub);
router.get('/search', searchUsers);
router.put('/:username', updateUser);
router.delete('/:username', softDeleteUser);

module.exports = router;
