"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Task } from "@/types/task";

const initialTasks: Task[] = [
  { id: 1, title: "Review notes for math", completed: false },
  { id: 2, title: "Read 10 pages of history", completed: false }
];
const taskStorageKey = "studysprint-tasks";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") {
      return initialTasks;
    }

    const storedTasks = localStorage.getItem(taskStorageKey);

    if (!storedTasks) {
      return initialTasks;
    }

    try {
      return JSON.parse(storedTasks) as Task[];
    } catch {
      return initialTasks;
    }
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    localStorage.setItem(taskStorageKey, JSON.stringify(tasks));
  }, [tasks]);

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

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });
  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <section className="dashboard-sections">
      <section className="task-card">
        <h2>Task Summary</h2>
        <div className="summary-grid">
          <article className="summary-item">
            <p className="summary-label">Total</p>
            <p className="summary-value">{tasks.length}</p>
          </article>
          <article className="summary-item">
            <p className="summary-label">Active</p>
            <p className="summary-value">{activeCount}</p>
          </article>
          <article className="summary-item">
            <p className="summary-label">Completed</p>
            <p className="summary-value">{completedCount}</p>
          </article>
        </div>
      </section>

      <section className="task-card">
        <h2>Add Task</h2>
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
      </section>

      <section className="task-card">
        <h2>Filter</h2>
        <div className="filter-row">
          <button
            type="button"
            className={filter === "all" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={filter === "active" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            type="button"
            className={filter === "completed" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </section>

      <section className="task-card">
        <h2>Task List</h2>
        <ul className="task-list">
          {visibleTasks.map((task) => (
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
        {visibleTasks.length === 0 && (
          <p className="empty-state">No tasks in this filter yet.</p>
        )}
      </section>
    </section>
  );
}
