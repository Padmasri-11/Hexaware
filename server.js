require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const applicationRoutes = require('./src/routes/application');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/application', applicationRoutes);

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});