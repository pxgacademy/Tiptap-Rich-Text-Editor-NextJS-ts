import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const comparePassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
};
