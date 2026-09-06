import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  try {
    await connectToDatabase();
    let skills = await Skill.find().sort({ order: 1, createdAt: -1 });
    if (skills.length === 0) {
      await seedDatabase();
      skills = await Skill.find().sort({ order: 1, createdAt: -1 });
    }
    return NextResponse.json(skills);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newSkill = await Skill.create(data);
    return NextResponse.json(newSkill, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
