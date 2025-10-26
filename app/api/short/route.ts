import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body?.url) {
    return NextResponse.json({ error: "No Body Provided" }, { status: 400 });
  }

  const session = await auth.api.getSession({ headers: req.headers });
  const shortId = nanoid(8);

  try {
    const res = await prisma.shortUrl.create({
      data: {
        UserId: session?.user.id || null,
        shortId: shortId,
        original: body.url,
      },
    });

    return NextResponse.json({ data: res }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Id is required" }, { status: 400 });
  }
  const session = await auth.api.getSession({ headers: req.headers });
  const shortId = await prisma.shortUrl.findUnique({
    where: {
      id: id,
      UserId: session?.user.id,
    },
    select: {
      id: true,
    },
  });
  if (!shortId) {
    return NextResponse.json(
      { error: "No Short Url of such id found!" },
      { status: 400 }
    );
  }
  try {
    const data = await prisma.shortUrl.delete({
      where: { id: shortId.id },
    });
    if (data) {
      return NextResponse.json({ data: data }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
