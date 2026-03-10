"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Task } from "@/types/task";

type TasksResponse = {
  tasks: Task[];
};

type TaskResponse = {
  task: Task;
};

type ApiErrorResponse = {
  error?: string;
};

const getApiErrorMessage = (data: unknown, fallback: string) => {
  if (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    typeof data.error === "string"
  ) {
    return data.error;
  }

  return fallback;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setErrorMessage(null);
        const response = await fetch("/api/tasks");
        const data = (await response.json()) as unknown;

        if (!response.ok) {
          throw new Error(getApiErrorMessage(data, "Failed to load tasks."));
        }

        setTasks((data as TasksResponse).tasks);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load tasks.";
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = newTask.trim();

    if (!trimmed) {
      return;
    }

    try {
      setIsCreating(true);
      setErrorMessage(null);
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: trimmed })
      });
      const data = (await response.json()) as unknown;

      if (!response.ok) {
        throw new Error(getApiErrorMessage(data, "Failed to create task."));
      }

      setTasks((currentTasks) => [...currentTasks, (data as TaskResponse).task]);
      setNewTask("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create task.";
      setErrorMessage(message);
    } finally {
      setIsCreating(false);
    }
  };

  const completeTask = async (id: number) => {
    try {
      setUpdatingTaskId(id);
      setErrorMessage(null);
      const response = await fetch(`/api/tasks/${id}/complete`, {
        method: "PATCH"
      });
      const data = (await response.json()) as unknown;

      if (!response.ok) {
        throw new Error(getApiErrorMessage(data, "Failed to complete task."));
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? (data as TaskResponse).task : task
        )
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to complete task.";
      setErrorMessage(message);
    } finally {
      setUpdatingTaskId(null);
    }
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
            disabled={isCreating}
          />
          <button type="submit" disabled={isCreating}>
            {isCreating ? "Adding..." : "Add"}
          </button>
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
        {isLoading && <p className="empty-state">Loading tasks...</p>}
        {errorMessage && <p className="empty-state">{errorMessage}</p>}
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <li key={task.id} className="task-item">
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  disabled={task.completed || updatingTaskId === task.id}
                  onChange={(event) => {
                    if (event.target.checked) {
                      void completeTask(task.id);
                    }
                  }}
                />
                <span className={task.completed ? "done" : ""}>{task.title}</span>
              </label>
            </li>
          ))}
        </ul>
        {!isLoading && visibleTasks.length === 0 && (
          <p className="empty-state">No tasks in this filter yet.</p>
        )}
      </section>
    </section>
  );
}
