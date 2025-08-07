import prisma from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, firstName, lastName } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, password: hashed, firstName, lastName },
  });

  return NextResponse.json({ message: "User registered", user });
}
