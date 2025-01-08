const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const initializeUserTable = require('./models/User');
const initializeFriendTable = require('./models/Friend');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');

const app = express();
app.use(cors);
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);

(async () => {
    await initializeUserTable();
    await initializeFriendTable();
})();

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
