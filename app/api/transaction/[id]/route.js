import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const transaction = await db.transaction.findUnique({
            where: { transacID: id },
            include: {
                product: true,
                user: true,
            },
        });

        if (!transaction) {
            return NextResponse.json({ status: 404, message: "Transaction not found" });
        }

        return NextResponse.json({ status: 200, transaction });
    } catch (error) {
        console.error("Failed to fetch transaction:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        const transaction = await db.transaction.delete({
            where: { transacID: id },
        });

        return NextResponse.json({ status: 200, message: "Transaction cancelled successfully" });
    } catch (error) {
        console.error("Failed to delete transaction:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        const transaction = await db.transaction.update({
            where: { transacID: id },
            data: { status },
            include: {
                product: true,
                user: true,
            },
        });

        return NextResponse.json({ status: 200, transaction });
    } catch (error) {
        console.error("Failed to update transaction:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}
