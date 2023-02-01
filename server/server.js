const PORT = process.env.PORT ?? 7000;
const cors = require('cors'); 
const express = require('express');
const app = express();
const pool = require('./db');

app.use(cors());

// TESTING SERVER
app.get('/', (req, res) => {
  res.send('Hello world')
});

//GET ALL TODOS
app.get('/todos/:userEmail', async (req, res) => {
  const { userEmail } = req.params;
  
  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
    res.json(todos.rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server is up on PORT ${PORT}`));
