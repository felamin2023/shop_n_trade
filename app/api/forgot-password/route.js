import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

// POST - Verify email exists
export async function POST(request) {
  try {
    const { email, verifyDetails, fullname, address, contact } =
      await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if email exists
    const user = await db.user.findUnique({
      where: { email },
      select: {
        userID: true,
        email: true,
        fullname: true,
        address: true,
        contact: true,
        role: true,
      },
    });

    // If user not found or user is an ADMIN, return not found
    if (!user || user.role === "ADMIN") {
      return NextResponse.json(
        { message: "No account found with this email" },
        { status: 404 }
      );
    }

    // If verifying details (step 2)
    if (verifyDetails) {
      const isFullnameMatch =
        user.fullname.toLowerCase().trim() === fullname.toLowerCase().trim();
      const isAddressMatch =
        user.address.toLowerCase().trim() === address.toLowerCase().trim();
      const isContactMatch = user.contact.trim() === contact.trim();

      if (!isFullnameMatch || !isAddressMatch || !isContactMatch) {
        return NextResponse.json(
          { message: "The information provided does not match our records" },
          { status: 400 }
        );
      }

      return NextResponse.json({
        status: 200,
        message: "Identity verified",
        verified: true,
      });
    }

    // Step 1: Just return that email exists
    return NextResponse.json({
      status: 200,
      message: "Email verified",
      userId: user.userID,
      fullname: user.fullname,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// PUT - Reset password
export async function PUT(request) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { message: "Email and new password are required" },
        { status: 400 }
      );
    }

    // Check if email exists
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email" },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    await db.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      status: 200,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: "Failed to reset password" },
      { status: 500 }
    );
  }
}
