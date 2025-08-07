import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";
import { hashPassword } from "@/utils/auth";

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return NextResponse.json(
      { message: "Email already in use" },
      { status: 400 }
    );

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: { firstName, lastName, email, password: hashedPassword },
  });

  return NextResponse.json({ user });
}
