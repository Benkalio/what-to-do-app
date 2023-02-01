const PORT = process.env.PORT ?? 7000;
const express = require('express');
const app = express();
const pool = require('./db');

// TESTING SERVER
app.get('/', (req, res) => {
  res.send('Hello wor')
});

//GET ALL TODOS
app.get('/todos', async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todos');
    res.json(todos.rows);
  } catch (error) {
    console.log(error);
  }
})

app.listen(PORT, () => console.log(`Server is up on PORT ${PORT}`));
