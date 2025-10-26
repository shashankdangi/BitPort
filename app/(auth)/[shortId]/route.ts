import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ shortId: string }> }
) {
  const { shortId } = await params;
  if (!shortId || shortId.length > 8) {
    return NextResponse.json({ error: "Invalid ShortId" }, { status: 400 });
  }
  try {
    const data = await prisma.shortUrl.findUnique({
      where: {
        shortId: shortId,
      },
    });

    if (data?.original) {
      return NextResponse.redirect(data.original);
      // return NextResponse.json({ data: data.original }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Unable to Find Original" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Unable to find" }, { status: 400 });
  }
}
