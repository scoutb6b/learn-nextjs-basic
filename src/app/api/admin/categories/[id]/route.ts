import { CategoryProps } from "@/app/_types/request/category";
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
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ message: "OK", category }, { status: 200 });
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
  const { name }: CategoryProps = await req.json();

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    return NextResponse.json({ message: "OK", category }, { status: 200 });
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
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
