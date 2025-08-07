import prisma from "@/lib/db";
import { comparePassword, generateToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const valid = await comparePassword(password, user.password);
  if (!valid)
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );

  const token = generateToken({ id: user.id, email: user.email });

  return NextResponse.json({ token });
}
