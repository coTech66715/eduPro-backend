const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');
const bodyParser = require('body-parser')
const assignmentRoute = require('./routes/assignmentRoute')
const authRoutes = require('./routes/authRoute');


dotenv.config();


const app = express();


connectDB();


app.use(express.json()); 
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use(cors()); 

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}))



app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Server Error');
});

app.use('/api/assignments', assignmentRoute)


const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
