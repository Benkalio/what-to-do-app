const PORT = process.env.PORT ?? 7000;
const express = require('express');
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

// TESTING SERVER
app.get('/', (req, res) => {
  res.send('Hello world')
});

//GET ALL TODOS
app.get('/todos/:user_email', async (req, res) => {
  const { user_email } = req.params;
  
  try {
    const todos = await pool.query(`SELECT * FROM todos WHERE user_email = $1`, [user_email]);
    res.json(todos.rows);
  } catch (error) {
    console.log(error);
  }
});

// CREATE A NEW TODO
app.post('/todos', async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  const id = uuidv4();
  try {
    const newTask = await pool.query(`INSERT INTO todos (id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5')`
    [id, user_email, title, progress, date]);
    res.json(newTask);
  } catch (error) {
    console.error(error);
  }
});

// UPDATE A TODO 
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const editTodo = await pool
      .query(`UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;`,
        [user_email, title, progress, date, id]);
    res.json(editTodo);
  } catch (error) {
    console.error(error);
  }
});

// DELETE TODO 
app.delete('/todos/:id', async (req, res) => { 
  const { id } = req.params;
  try {
    const deleteTodo = await pool.query(`DELETE FROM todos WHERE id = $1', [id]`)
    res.json(deleteTodo);

  } catch (error) {
    console.error(error);
  }
});

//SIGNUP
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const signUp = await pool.query(`INSERT INTO users (email, hashed_password VALUES ($1, $2)`,
      [email, hashedPassword]);
    
    jwt.sign({ email }, 'secret', { expiresIn: '1hr' });

    res.json({email, token});
    
  } catch (error) {
    console.error(error);
    if (error) {
      res.json({detail: error.detail})
    }
  }
});

//LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server is up on PORT ${PORT}`));
