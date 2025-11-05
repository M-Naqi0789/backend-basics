import React from 'react'

const TodoItem = ({ todo, handleEdit, deleteTodo }) => {
  return (
    <li className='flex justify-between items-center p-4 bg-gray-100 border border-gray-200 rounded-lg'>
      <span className='text-lg text-gray-700 font-medium'>
        {todo.task}
      </span>
      <div className='space-x-2'>
        <button
          onClick={() => handleEdit(todo._id, todo.task)}
          className='text-sm px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-150'
        >
          Edit
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className='text-sm px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150'
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem