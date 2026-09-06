import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Name, Email, and Message are required fields." },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({
      name: data.name,
      email: data.email,
      address: data.address || "",
      linkedin: data.linkedin || "",
      location: data.location || "",
      message: data.message,
      read: false,
    });

    return NextResponse.json(
      { success: true, message: "Thank you! Your message has been stored.", contact: newContact },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
