import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
  const users = await db.user.findMany({});

  if (!users) {
    return NextResponse.json({ status: 400 });
  }

  return NextResponse.json({ status: 200, users });
}
