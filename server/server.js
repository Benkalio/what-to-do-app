const PORT = process.env.PORT ?? 7000;
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid');
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

// CREATE A NEW TODO
app.post('/todos', async (req, res) => {
  const { userEmail, title, progress, date } = req.body;
  const id = uuidv4();
  try {
    pool.query(`INSERT INTO todos (id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5')`
    [id, userEmail, title, progress, date])
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server is up on PORT ${PORT}`));
