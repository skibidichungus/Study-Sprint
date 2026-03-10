import { NextResponse } from "next/server";
import { tasks } from "@/app/api/tasks/store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const taskId = Number(id);

  if (!Number.isInteger(taskId)) {
    return NextResponse.json(
      { error: "Task id must be a number." },
      { status: 400 }
    );
  }

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }

  task.completed = true;

  return NextResponse.json({ task }, { status: 200 });
}
