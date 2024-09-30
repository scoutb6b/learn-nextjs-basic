import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface CreateCategoryRequestBody {
  name: string;
}

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ message: error.message }, { status: 400 });
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(
      { message: "ok", categories: categories },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ message: error.message }, { status: 400 });
  try {
    const body = await req.json();
    const { name }: CreateCategoryRequestBody = body;
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: category.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
};
