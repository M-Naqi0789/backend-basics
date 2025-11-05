import React, { useState } from 'react'

const TodoForm = ({ addTodo }) => {
  const [newTask, setNewTask] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim() === '') return
    addTodo(newTask)
    setNewTask('')
  }

  return (
    <form onSubmit={handleSubmit} className='flex mb-6 space-x-2'>
      <input
        type='text'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Enter new task'
        className='flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150'
      />
      <button
        type='submit'
        className='px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md'
      >
        Add
      </button>
    </form>
  )
}

export default TodoForm