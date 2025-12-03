import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET(request) {
  const users = await db.user.findMany({});

  if (!users) {
    return NextResponse.json({ status: 400 });
  }

  return NextResponse.json({ status: 200, users });
}

export async function POST(request) {
  try {
    const { fullname, email, address, password, contact, img, role } =
      await request.json();

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        fullname,
        email,
        address,
        password: hashedPassword,
        contact: String(contact),
        img,
        role,
      },
    });

    return NextResponse.json({ status: 201, user });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Failed to create account" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { userID } = await request.json();

    if (!userID) {
      return NextResponse.json({
        status: 400,
        message: "User ID is required",
      });
    }

    await db.user.delete({
      where: { userID },
    });

    return NextResponse.json({
      status: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({
      status: 400,
      message: "Failed to delete user",
    });
  }
}
