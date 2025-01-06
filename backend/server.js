const express = require('express');
const bodyParser = require('body-parser');
const initializeUserTable = require('./models/User');
const initializeFriendTable = require('./models/Friend');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);

(async () => {
    await initializeUserTable();
    await initializeFriendTable();
})();

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
