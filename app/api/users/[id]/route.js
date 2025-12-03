import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET(request, { params }) {
  const { id } = await params;
  
  try {
    const user = await db.user.findUnique({
      where: { userID: id },
      select: {
        userID: true,
        fullname: true,
        email: true,
        address: true,
        contact: true,
        img: true,
        role: true,
      }
    });

    if (!user) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }

    return NextResponse.json({ status: 200, user });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  
  try {
    const body = await request.json();
    const { password, currentPassword } = body;

    // Find the user first
    const existingUser = await db.user.findUnique({
      where: { userID: id },
    });

    if (!existingUser) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }

    // If updating password, verify current password first
    if (password) {
      if (currentPassword) {
        const isValidPassword = await bcrypt.compare(currentPassword, existingUser.password);
        if (!isValidPassword) {
          return NextResponse.json({ status: 401, message: "Current password is incorrect" });
        }
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const updatedUser = await db.user.update({
        where: { userID: id },
        data: { password: hashedPassword },
        select: {
          userID: true,
          fullname: true,
          email: true,
          address: true,
          contact: true,
          img: true,
          role: true,
        }
      });

      return NextResponse.json({ status: 200, user: updatedUser, message: "Password updated successfully" });
    }

    return NextResponse.json({ status: 400, message: "No password provided" });
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ status: 500, message: error.message || "Internal Server Error" });
  }
}

// PATCH - Update user profile (image, etc.)
export async function PATCH(request, { params }) {
  const { id } = await params;
  
  try {
    const body = await request.json();
    const { img, fullname, email, address, contact } = body;

    // Find the user first
    const existingUser = await db.user.findUnique({
      where: { userID: id },
    });

    if (!existingUser) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }

    // Build update data object with only provided fields
    const updateData = {};
    if (img !== undefined) updateData.img = img;
    if (fullname !== undefined) updateData.fullname = fullname;
    if (email !== undefined) updateData.email = email;
    if (address !== undefined) updateData.address = address;
    if (contact !== undefined) updateData.contact = String(contact);

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ status: 400, message: "No data to update" });
    }

    const updatedUser = await db.user.update({
      where: { userID: id },
      data: updateData,
      select: {
        userID: true,
        fullname: true,
        email: true,
        address: true,
        contact: true,
        img: true,
        role: true,
      }
    });

    return NextResponse.json({ status: 200, user: updatedUser, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Failed to update user profile:", error);
    return NextResponse.json({ status: 500, message: error.message || "Internal Server Error" });
  }
}
