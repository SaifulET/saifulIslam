import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  try {
    await connectToDatabase();
    let profile = await Profile.findOne();
    if (!profile) {
      await seedDatabase();
      profile = await Profile.findOne();
    }
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(data);
    } else {
      Object.assign(profile, data);
    }
    await profile.save();
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
