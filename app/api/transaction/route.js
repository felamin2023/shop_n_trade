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

  return NextResponse.json({ status: 200, transaction });
}

// import { NextResponse } from "next/server";
// import db from "@/lib/db";

// export async function GET(request) {
//   try {
//     const transactions = await db.transaction.findMany({
//       include: {
//         product: true,
//         user: true,
//       },
//     });

//     if (!transactions.length) {
//       return NextResponse.json({
//         status: 404,
//         message: "No transactions found.",
//       });
//     }

//     return NextResponse.json({ status: 200, transactions });
//   } catch (error) {
//     console.error("Database query failed", error);
//     return NextResponse.json({ status: 500, message: "Internal Server Error" });
//   }
// }
