import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Password login is gone. Mail a 6-digit OTP from /login." },
    { status: 410 },
  );
}
