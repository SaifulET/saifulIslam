import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Education from "@/models/Education";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  try {
    await connectToDatabase();
    let education = await Education.find().sort({ order: 1, createdAt: -1 });
    if (education.length === 0) {
      await seedDatabase();
      education = await Education.find().sort({ order: 1, createdAt: -1 });
    }
    return NextResponse.json(education);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newEdu = await Education.create(data);
    return NextResponse.json(newEdu, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
