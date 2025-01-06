const pool = require('../db/db');

// Find mutual followers and save as friends
const findAndSaveMutualFriends = async (req, res) => {
    const { username } = req.params;

    try {
        // Get user ID from username
        const userResult = await pool.query('SELECT id FROM users WHERE username = $1 AND deleted = false', [username]);
        if (!userResult.rows.length) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userId = userResult.rows[0].id;

        // Fetch followers and following of the user
        const followersResult = await pool.query(
            'SELECT id FROM users WHERE id IN (SELECT user_id FROM friends WHERE friend_id = $1)',
            [userId]
        );
        const followingResult = await pool.query(
            'SELECT id FROM users WHERE id IN (SELECT friend_id FROM friends WHERE user_id = $1)',
            [userId]
        );

        const followers = followersResult.rows.map((row) => row.id);
        const following = followingResult.rows.map((row) => row.id);

        // Identify mutual followers
        const mutualFriends = followers.filter((followerId) => following.includes(followerId));

        // Save mutual friends to the `friends` table
        for (const friendId of mutualFriends) {
            // Avoid duplicate entries
            const existingFriend = await pool.query(
                'SELECT * FROM friends WHERE user_id = $1 AND friend_id = $2',
                [userId, friendId]
            );
            if (!existingFriend.rows.length) {
                await pool.query('INSERT INTO friends (user_id, friend_id) VALUES ($1, $2)', [userId, friendId]);
            }
        }

        res.status(200).json({ message: 'Mutual friends saved successfully', mutualFriends });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { findAndSaveMutualFriends };
