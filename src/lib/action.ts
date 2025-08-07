"use server";

import { comparePassword, hashPassword } from "@/utils/auth";
import prisma from "./db";
import { CreatePostInputs, CreateUserInputs } from "./types";

export async function createPost(data: CreatePostInputs) {
  try {
    const post = await prisma.post.create({ data });
    return {
      success: true,
      message: "Successfully created the post",
      data: post,
    };

    //
  } catch (error) {
    console.error("Error creating post: ", error);
    return {
      success: false,
      message: "Failed to create the post",
      data: null,
    };
  }
}

export async function createUser(data: CreateUserInputs) {
  const { email, password, firstName, lastName } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return {
      success: false,
      message: "User already exists",
      data: null,
    };

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, password: hashed, firstName, lastName },
  });

  return {
    success: true,
    message: "User registered successfully",
    data: user,
  };
}

export async function loginUser(data: Partial<CreateUserInputs>) {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return {
      success: false,
      message: "Invalid credentials",
      data: null,
    };

  const isMatch = await comparePassword(password!, user.password);
  if (!isMatch)
    return {
      success: false,
      message: "Invalid credentials",
      data: null,
    };

  return {
    success: false,
    message: "User logged in successfully",
    data: user,
  };
}

export async function getUser(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return {
      success: false,
      message: "Invalid credentials",
      data: null,
    };

  return {
    success: true,
    message: "User retrieved successfully",
    data: user,
  };
}
