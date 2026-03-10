"use client";

import { FormEvent, useState } from "react";
import type { Task } from "@/types/task";

const initialTasks: Task[] = [
  { id: 1, title: "Review notes for math", completed: false },
  { id: 2, title: "Read 10 pages of history", completed: false }
];

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = newTask.trim();

    if (!trimmed) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title: trimmed,
        completed: false
      }
    ]);
    setNewTask("");
  };

  const toggleTaskComplete = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <section className="task-card">
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Add a study task..."
          aria-label="Task title"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskComplete(task.id)}
              />
              <span className={task.completed ? "done" : ""}>{task.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
