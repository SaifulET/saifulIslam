import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const featuredParam = searchParams.get("featured");

    const query: any = {};
    if (featuredParam === "true") {
      query.featured = { $ne: false };
    } else if (featuredParam === "false") {
      query.featured = false;
    }

    let projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (!isNaN(limit)) {
        projects = projects.slice(0, limit);
      }
    }

    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newProject = await Project.create(data);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
