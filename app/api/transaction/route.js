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
        user: {
          select: {
            userID: true,
            fullname: true,
            email: true,
            address: true,
            contact: true,
            img: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ status: 200, transactions });
  } catch (error) {
    console.error("Database query failed:", error.message);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { productID, userID, images, scheduledDate, scheduledTime } = body;

    if (!productID || !userID) {
      return NextResponse.json({
        status: 400,
        message: "Product ID and User ID are required",
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

export async function PUT(request) {
  try {
    const { transacID, status } = await request.json();

    // Get the current transaction to check its status and get productID
    const currentTransaction = await db.transaction.findUnique({
      where: { transacID },
      include: { product: true },
    });

    if (!currentTransaction) {
      return NextResponse.json({
        status: 404,
        message: "Transaction not found",
      });
    }

    const previousStatus = currentTransaction.status;
    const productID = currentTransaction.productID;

    // Update the transaction status
    const updatedTransaction = await db.transaction.update({
      where: { transacID },
      data: { status },
    });

    // Handle stock changes based on status transition
    // ACCEPTED: Decrease stock by 1 (product is reserved)
    if (status === "ACCEPTED" && previousStatus === "PENDING") {
      await db.product.update({
        where: { productID },
        data: { stock: { decrement: 1 } },
      });
    }

    // CANCELED: Restore stock by 1 (only if it was previously ACCEPTED)
    if (status === "CANCELED" && previousStatus === "ACCEPTED") {
      await db.product.update({
        where: { productID },
        data: { stock: { increment: 1 } },
      });
    }

    // DELIVERED: No stock change needed (already decremented when ACCEPTED)
    // REJECTED: No stock change needed (was never accepted, so no stock was reserved)

    return NextResponse.json({ status: 200, transaction: updatedTransaction });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update transaction",
    });
  }
}
