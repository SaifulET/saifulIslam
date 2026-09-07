import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Skill from "@/models/Skill";

export async function GET() {
  try {
    await connectToDatabase();
    const skills = await Skill.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(skills);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    if (data.name) {
      data.name = data.name.trim();
      const existing = await Skill.findOne({ name: { $regex: new RegExp(`^${data.name}$`, "i") } });
      if (existing) {
        return NextResponse.json({ error: `A skill named "${data.name}" already exists.` }, { status: 400 });
      }
    }
    const newSkill = await Skill.create(data);
    return NextResponse.json(newSkill, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Skill name must be unique." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
