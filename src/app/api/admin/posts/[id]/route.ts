import { UpdatePostBody } from "@/app/_types/request/posts";
import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ message: error.message }, { status: 400 });
  const { id } = params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json({ message: "ok", post: post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ message: error.message }, { status: 400 });
  const { id } = params;

  const { title, content, categories, thumbnailImageKey }: UpdatePostBody =
    await req.json();

  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
        thumbnailImageKey,
      },
    });
    await prisma.postCategory.deleteMany({
      where: {
        postId: parseInt(id),
      },
    });

    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          postId: post.id,
          categoryId: category.id,
        },
      });
    }
    return NextResponse.json({ message: "ok", post: post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ message: error.message }, { status: 400 });
  const { id } = params;
  try {
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: "ok" }, { status: 200 });
  }
};
