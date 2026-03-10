import TaskList from "@/components/TaskList";

export default function HomePage() {
  return (
    <main className="container">
      <h1>StudySprint</h1>
      <p>Track your study tasks in one simple place.</p>
      <TaskList />
    </main>
  );
}
