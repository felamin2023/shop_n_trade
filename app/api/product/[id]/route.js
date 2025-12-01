import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productID = searchParams.get("productID"); // Extract productID from URL

    if (!productID) {
      return NextResponse.json({ status: 400, error: "Missing productID" });
    }

    const { product, material, materialGoal, stock, img } =
      await request.json();

    const updatedProduct = await db.product.update({
      where: { productID }, // Ensure productID is used as a string (UUID)
      data: {
        product,
        material,
        materialGoal,
        stock,
        img,
      },
    });

    return NextResponse.json({ status: 200, updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to update product",
    });
  }
}
