//api/product/route.js

import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const product = await db.product.findMany();
    if (!product) {
      return NextResponse.json({ status: 400 });
    }
    return NextResponse.json({ status: 200, product });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        status: 500,
        error: "Failed to fetch products",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { product, material, materialGoal, stock, img } =
      await request.json();
    const newProduct = await db.product.create({
      data: {
        product,
        material,
        materialGoal,
        stock,
        img,
      },
    });
    return NextResponse.json({ status: 201, newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to create product",
    });
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productID = searchParams.get("productID"); // Extract productID from URL

    if (!productID) {
      return NextResponse.json({ status: 400, error: "Missing productID" });
    }

    const { product, material, materialGoal, stock, img } =
      await request.json();

    console.log("Updating product with ID:", productID);
    console.log("Received data:", {
      product,
      material,
      materialGoal,
      stock,
      img,
    });

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
export async function DELETE(request) {
  try {
    const { productID } = await request.json();

    await db.product.delete({
      where: { productID },
    });

    return NextResponse.json({
      status: 200,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      error: "Failed to delete project",
    });
  }
}
