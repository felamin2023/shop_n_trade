import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
  const users = await db.user.findMany({});

  if (!users) {
    return NextResponse.json({ status: 400 });
  }

  return NextResponse.json({ status: 200, users });
}

export async function POST(request) {
  const { fullname, email, address, password, contact, img, role } =
    await request.json();

  console.log(fullname, email, address, password, contact, img, role);

  const user = await db.user.create({
    data: {
      fullname,
      email,
      address,
      password,
      contact: String(contact),
      img,
      role,
    },
  });

  return NextResponse.json({ status: 201, user });
}
