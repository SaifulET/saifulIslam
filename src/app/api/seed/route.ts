import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed";

export async function POST(req: Request) {
  try {
    const { force } = await req.json().catch(() => ({ force: false }));
    await seedDatabase(force === true);
    return NextResponse.json({ success: true, message: "Database seeded successfully!" });
  } catch (error: any) {
    console.error("Seed API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
