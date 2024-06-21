const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;
// Middleware for CORS and parsing request bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const authRoutes = require('./routes/Common/authRoutes');
app.use('/api/auth', authRoutes); // Use the upload route






// // Use the logging middleware
// app.use(loggingMiddleware);

// Connect to MongoDB with the specified database
mongoose.connect('mongodb+srv://Zohaib24648:Zohaib24648@userlogins.94nzbbm.mongodb.net/AMS', {
})
.then(() => {
    console.log('Connected to the AMS Database');
    app.listen(port, () => console.log(`Server is running on port ${port}`));
})
.catch((err) => {
    console.log('Not Connected to the Database: ' + err);
});


// Catch-all for unhandled routes
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route does not exist.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
