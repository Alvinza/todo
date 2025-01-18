const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors'); // Import CORS

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/tasks', taskRoutes); // Task routes

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
