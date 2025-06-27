const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const analyzeRoutes = require('./routes/analyzeRoutes');
const { router: langueRoutes } = require('./routes/langueRoutes');


const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(helmet());


app.use('/api/analyze', analyzeRoutes);
app.use('/api/langue', langueRoutes);

module.exports = app;
