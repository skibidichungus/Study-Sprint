import TaskList from "@/components/TaskList";

export default function HomePage() {
  return (
    <>
      <header className="top-nav">
        <div className="top-nav-inner">
          <strong>StudySprint</strong>
          <span>Student Productivity</span>
        </div>
      </header>

      <main className="container">
        <section className="page-header">
          <h1>Dashboard</h1>
          <p>Plan your study tasks and track your progress today.</p>
        </section>

        <TaskList />
      </main>
    </>
  );
}
