'use client'

import { useEffect, useState } from 'react'

type Task = {
  text: string
  done: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [showCompleted, setShowCompleted] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks([...tasks, { text: newTask, done: false }])
    setNewTask('')
  }

  const toggleTask = (index: number) => {
    const updated = [...tasks]
    updated[index].done = !updated[index].done
    setTasks(updated)
  }

  const removeTask = (index: number) => {
    const updated = [...tasks]
    updated.splice(index, 1)
    setTasks(updated)
  }

  const startEditing = (index: number, currentText: string) => {
    setEditingIndex(index)
    setEditingText(currentText)
  }

  const finishEditing = (index: number) => {
    if (!editingText.trim()) {
      setEditingIndex(null)
      return
    }
    const updated = [...tasks]
    updated[index].text = editingText
    setTasks(updated)
    setEditingIndex(null)
  }


  const filteredTasks = tasks.filter((task) => {
    if (showCompleted) {
      return task.done
    }
    return !task.done
  })

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowCompleted(false)}
            className={`px-4 py-2 ${!showCompleted ? 'bg-blue-500 text-white' : 'cursor-pointer bg-gray-300'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setShowCompleted(true)}
            className={`px-4 py-2 ${showCompleted ? 'bg-blue-500 text-white' : 'cursor-pointer bg-gray-300'}`}
          >
            Done
          </button>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Enter a task"
            className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
          />
          <button
            onClick={addTask}
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              {editingIndex === index ? (
                <input
                  className="flex-grow border px-2 py-1 mr-2"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => finishEditing(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') finishEditing(index)
                  }}
                  autoFocus
                />
                ) : (
                <span className={`flex-grow ${task.done ? 'line-through text-gray-500' : ''}`}>
                  {task.text}
                </span>
              )}
              <div className="ml-auto flex space-x-2">
                <button
                  onClick={() => toggleTask(index)}
                  className={`cursor-pointer ${task.done ? 'line-through text-gray-500' : ''}`}
                >
                  ✓
                </button>
                <button
                  onClick={() => startEditing(index, task.text)}
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                >
                  🖋
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
