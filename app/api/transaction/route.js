import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get("userID");
    const status = searchParams.get("status");

    // Build the where clause based on query params
    const whereClause = {};
    if (userID) {
      whereClause.userID = userID;
    }
    if (status) {
      whereClause.status = status;
    }

    const transactions = await db.transaction.findMany({
      where: whereClause,
      include: {
        product: true,
        user: true,
      },
      orderBy: {
        transacID: 'desc',
      },
    });

    return NextResponse.json({ status: 200, transactions });
  } catch (error) {
    console.error("Database query failed", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { productID, userID, images, scheduledDate, scheduledTime } = body;

    if (!productID || !userID) {
      return NextResponse.json({
        status: 400,
        message: "Product ID and User ID are required"
      });
    }

    const transaction = await db.transaction.create({
      data: {
        productID,
        userID,
        images: images || [],
        scheduledDate: scheduledDate || null,
        scheduledTime: scheduledTime || null,
        status: "PENDING",
      },
      include: {
        product: true,
        user: true,
      },
    });

    return NextResponse.json({ status: 201, transaction });
  } catch (error) {
    console.error("Failed to create transaction", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
