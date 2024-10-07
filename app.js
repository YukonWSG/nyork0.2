const express = require('express');
const bodyParser = require('body-parser');

// Routes Here
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const deptRoutes = require('./routes/deptRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Sanota');
});

// Endpoint Here
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dept', deptRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/student', studentRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log('Working on port', PORT);
});