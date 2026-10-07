import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { sendContactNotification, sendContactConfirmation } from "@/lib/mailer";

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

    // 1. Save to MongoDB
    const newContact = await Contact.create({
      name: data.name.trim(),
      email: data.email.trim(),
      address: (data.address || "").trim(),
      linkedin: (data.linkedin || "").trim(),
      location: (data.location || "").trim(),
      message: data.message.trim(),
      read: false,
    });

    // 2. Dispatch Email notification via SMTP to portfolio owner & auto-reply to sender
    let emailStatus = { success: false };
    try {
      emailStatus = await sendContactNotification({
        name: data.name.trim(),
        email: data.email.trim(),
        address: data.address?.trim(),
        linkedin: data.linkedin?.trim(),
        location: data.location?.trim(),
        message: data.message.trim(),
      });

      // Background confirmation acknowledgment
      sendContactConfirmation({
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
      }).catch((err) => console.error("Confirmation email background error:", err));
    } catch (mailErr) {
      console.error("SMTP transmission error:", mailErr);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you! Your message has been transmitted and received successfully.", 
        contact: newContact,
        emailSent: emailStatus.success 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

