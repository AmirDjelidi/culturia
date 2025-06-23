const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const analyzeRoutes = require('./routes/analyzeRoutes');

const app = express();
app.use(express.json({ limit: '10mb' })); // autoriser les images base64
app.use(cors());
app.use(helmet());


app.use('/api/analyze', analyzeRoutes);

module.exports = app;
