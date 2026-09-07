import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Use email OTP from /signup." },
    { status: 410 },
  );
}
