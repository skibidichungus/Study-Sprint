import { NextResponse } from "next/server";
import type { Task } from "@/types/task";
import { tasks } from "@/app/api/tasks/store";

type CreateTaskRequest = {
  title?: string;
};

export async function GET() {
  return NextResponse.json({ tasks }, { status: 200 });
}

export async function POST(request: Request) {
  let body: CreateTaskRequest;

  try {
    body = (await request.json()) as CreateTaskRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body. Expected: { \"title\": \"Your task\" }" },
      { status: 400 }
    );
  }

  const title = body.title?.trim();

  if (!title) {
    return NextResponse.json(
      { error: "Title is required and must be a non-empty string." },
      { status: 400 }
    );
  }

  const newTask: Task = {
    id: Date.now(),
    title,
    completed: false
  };

  tasks.push(newTask);

  return NextResponse.json({ task: newTask }, { status: 201 });
}
