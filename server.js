const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');


dotenv.config();


const app = express();


connectDB();


app.use(express.json()); 
app.use(cors()); 


const authRoutes = require('./routes/authRoute');
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Server Error');
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
