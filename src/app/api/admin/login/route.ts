import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "admin@odaboo.local";
    const expectedPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";

    if (email === expectedEmail && password === expectedPassword) {
      return NextResponse.json({ success: true, message: "Authenticated successfully" });
    }

    return NextResponse.json(
      { success: false, error: "Invalid admin email or password" },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
