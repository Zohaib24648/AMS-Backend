// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const gradeRoutes = require('./routes/gradeCriteriaRoutes'); 

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/grades', gradeRoutes); 

mongoose.connect('mongodb+srv://Zohaib24648:Zohaib24648@userlogins.94nzbbm.mongodb.net/AMS', {
})
.then(() => {
    console.log('Connected to the AMS Database');
    app.listen(port, () => console.log(`Server is running on port ${port}`));
})
.catch((err) => {
    console.log('Not Connected to the Database: ' + err);
});

app.use((req, res, next) => {
  res.status(404).send('Sorry, that route does not exist.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
