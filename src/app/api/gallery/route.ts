import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  try {
    await connectToDatabase();
    let gallery = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
    if (gallery.length === 0) {
      await seedDatabase();
      gallery = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
    }
    return NextResponse.json(gallery);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newImage = await GalleryImage.create(data);
    return NextResponse.json(newImage, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
