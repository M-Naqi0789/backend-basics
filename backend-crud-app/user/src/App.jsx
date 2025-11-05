import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

const API_URL = '/api/todos'
function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL)
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async (task) => {
    try {
      const response = await axios.post(API_URL, { task })
      setTodos([...todos, response.data])
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const handleEdit = async (id, currentTask) => {
    const newText = prompt('Edit task:', currentTask)
    if (newText && newText.trim() !== '' && newText !== currentTask) {
      try {
        const response = await axios.put(`${API_URL}/${id}`, { task: newText })
        setTodos(
          todos.map((todo) => (todo._id === id ? response.data : todo))
        )
      } catch (error) {
        console.error('Error updating todo:', error)
      }
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-start justify-center p-4'>
      <div className='w-full max-w-lg mt-12 bg-white p-6 rounded-xl shadow-2xl'>
        <h1 className='text-4xl font-extrabold text-gray-800 text-center mb-8'>
          Basic CRUD 
        </h1>
        
        <TodoForm addTodo={addTodo} />

        <ul className='space-y-3'>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              handleEdit={handleEdit}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>

        {todos.length === 0 && (
          <p className='text-center text-gray-500 italic mt-8'>
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </div>
  )
}

export default App