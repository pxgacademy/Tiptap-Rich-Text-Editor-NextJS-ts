"use server";

import { comparePassword, hashPassword } from "@/utils/auth";
import prisma from "./db";
import { CreatePostInputs, CreateUserInputs } from "./types";

// --------------------
// Create a Post
// --------------------
export async function createPost(data: CreatePostInputs) {
  try {
    const post = await prisma.post.create({ data });

    return {
      success: true,
      message: "Successfully created the post",
      data: post,
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      message: "Failed to create the post",
      data: null,
    };
  }
}

// --------------------
// Create a New User
// --------------------
export async function createUser(data: CreateUserInputs) {
  try {
    const { email, password, firstName, lastName } = data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
        data: null,
      };
    }

    // Hash the password
    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, password: hashed, firstName, lastName },
    });

    // Remove password from response
    const { password: _, ...safeUser } = user;

    return {
      success: true,
      message: "User registered successfully",
      data: safeUser,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message: "Failed to create the user",
      data: null,
    };
  }
}

// --------------------
// Login User
// --------------------
type LoginInputs = { email: string; password: string };

export async function loginUser({ email, password }: LoginInputs) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return {
        success: false,
        message: "Invalid credentials",
        data: null,
      };
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid credentials",
        data: null,
      };
    }

    // Remove password before returning
    const { password: _, ...safeUser } = user;

    return {
      success: true,
      message: "User logged in successfully",
      data: safeUser,
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "Failed to log in",
      data: null,
    };
  }
}

// --------------------
// Get User by Email
// --------------------
export async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }

    const { password: _, ...safeUser } = user;

    return {
      success: true,
      message: "User retrieved successfully",
      data: safeUser,
    };
  } catch (error) {
    console.error("Error getting user:", error);
    return {
      success: false,
      message: "Failed to retrieve user",
      data: null,
    };
  }
}
