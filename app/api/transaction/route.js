import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
  try {
    const transactions = await db.transaction.findMany({
      include: {
        product: true,
        user: true,
      },
    });

    if (!transactions) {
      return NextResponse.json({ status: 400 });
    }

    return NextResponse.json({ status: 200, transactions });
  } catch (error) {
    console.error("Database query failed", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

export async function PUT(request) {
  try {
    const { transacID, status } = await request.json();

    const updatedTransaction = await db.transaction.update({
      where: { transacID },
      data: { status },
    });

    return NextResponse.json({ status: 200, transaction: updatedTransaction });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update transaction",
    });
  }
}
