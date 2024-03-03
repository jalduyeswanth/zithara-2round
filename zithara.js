const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors=require('cors');
const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors())
app.use(express.json());

// Define GET endpoint to fetch customer data
app.get('/api/customers', async (req, res) => {
  try {
    const { rows } = await pool.query('Select * from customer');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching customer data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define POST endpoint to create a new customer
app.post('/api/customers', async (req, res) => {
    try {
      const { customer_name, age, phone, location ,created_date,created_time} = req.body;
      res.status(201).json({
        status: 'success',
        data: {
          customer_name,
          age,
          phone,
          location,
          created_date,
          created_time
        }
      });
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});