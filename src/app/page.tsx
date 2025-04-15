'use client'

import { useEffect, useState } from 'react'

type Task = {
  text: string
  done: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  // 初回マウント時に localStorage からデータを読み込む
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  // tasks が変更されるたびに localStorage に保存
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

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
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
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <span
                className={`cursor-pointer ${task.done ? 'line-through text-gray-500' : ''}`}
                onClick={() => toggleTask(index)}
              >
                {task.text}
              </span>
              <button
                onClick={() => removeTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
