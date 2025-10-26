import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return NextResponse.json({ success: false }, { status: 404 });

  try {
    const data = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        shortUrls: {
          select: {
            id: true,
            shortId: true,
            original: true,
          },
        },
      },
    });

    if (!data)
      return NextResponse.json({
        success: false,
        error: "User data not found",
      });

    return NextResponse.json(
      { success: true, data: data.shortUrls },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
