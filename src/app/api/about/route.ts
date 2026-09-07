import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import About from "@/models/About";

export async function GET() {
  try {
    await connectToDatabase();
    const aboutList = await About.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json(aboutList);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    if (!data.title) {
      data.title = "";
    }
    const newAbout = await About.create(data);
    return NextResponse.json(newAbout, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
