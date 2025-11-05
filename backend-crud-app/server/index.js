const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const Todo = require('./models/Todo')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err))

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find({})
  res.json(todos)
})

app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
  })
  const savedTodo = await newTodo.save()
  res.json(savedTodo)
})

app.put('/api/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { task: req.body.task },
    { new: true }
  )
  res.json(updatedTodo)
})

app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id)
  res.json({ message: 'Todo deleted successfully' })
})

// if (process.env.NODE_ENV !== 'production') {
//   app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
// }

module.exports = app;