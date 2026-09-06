import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  try {
    await connectToDatabase();
    let experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    if (experiences.length === 0) {
      await seedDatabase();
      experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    }
    return NextResponse.json(experiences);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newExp = await Experience.create(data);
    return NextResponse.json(newExp, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
