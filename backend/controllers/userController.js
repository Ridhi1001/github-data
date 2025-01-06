const pool = require('../db/db');
const { fetchGithubUser } = require('../services/githubService');

const addUserFromGithub = async (req, res) => {
    const { username } = req.body;
    try {
        // Check if user exists in DB
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1 AND deleted = false', [username]);
        if (existingUser.rows.length) return res.status(200).json(existingUser.rows[0]);

        // Fetch user from GitHub
        const githubUser = await fetchGithubUser(username);

        const result = await pool.query(
            `INSERT INTO users (username, email, location, blog, bio, public_repos, public_gists, followers, following)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
            [
                githubUser.login,
                githubUser.email || null,
                githubUser.location || null,
                githubUser.blog || null,
                githubUser.bio || null,
                githubUser.public_repos,
                githubUser.public_gists,
                githubUser.followers,
                githubUser.following,
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const searchUsers = async (req, res) => {
    const { field, value } = req.query; // Example: /api/users/search?field=username&value=johndoe
    try {
        const query = `SELECT * FROM users WHERE ${field} ILIKE $1 AND deleted = false`;
        const result = await pool.query(query, [`%${value}%`]);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    const { username } = req.params;
    const updates = req.body;
    try {
        const keys = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`);
        const values = [username, ...Object.values(updates)];
        const query = `
      UPDATE users SET ${keys.join(', ')}, updated_at = NOW()
      WHERE username = $1 AND deleted = false
      RETURNING *;
    `;
        const result = await pool.query(query, values);
        if (!result.rows.length) return res.status(404).json({ message: 'User not found or deleted' });
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const softDeleteUser = async (req, res) => {
    const { username } = req.params;
    try {
        const result = await pool.query('UPDATE users SET deleted = true WHERE username = $1 RETURNING *', [username]);
        if (!result.rows.length) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User soft-deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addUserFromGithub, searchUsers, updateUser, softDeleteUser };
