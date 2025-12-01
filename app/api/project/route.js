import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
  const project = await db.project.findMany({});

  if (!project) {
    return NextResponse.json({ status: 400 });
  }

  return NextResponse.json({ status: 200, project });
}

export async function POST(request) {
  const { school, location, itemgoal, status } = await request.json();

  const project = await db.project.create({
    data: { school, location, itemgoal, status },
  });

  return NextResponse.json({ status: 201, project });
}

export async function PUT(request) {
  try {
    const { projectID, school, location, itemgoal, status } =
      await request.json();

    if (!projectID) {
      return NextResponse.json({
        status: 400,
        message: "Project ID is required",
      });
    }

    const updatedProject = await db.project.update({
      where: { projectID },
      data: { school, location, itemgoal, status },
    });

    return NextResponse.json({ status: 200, project: updatedProject });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Update failed", error });
  }
}

export async function DELETE(request) {
  try {
    const { projectID } = await request.json();

    await db.project.delete({
      where: { projectID },
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
