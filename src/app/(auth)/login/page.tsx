"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/lib/action";
import { LocalUserInputs } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginUser({
      email: form.email,
      password: form.password,
    });

    if (result.success) {
      toast.success(result.message);
      const { id, email, firstName, lastName } = result.data as LocalUserInputs;
      login({ id, email, firstName, lastName });
      router.push("/");
    } else toast.error(result.message);
  };

  return (
    <div className="p-4 max-w-md mx-auto border  rounded-xl mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <div className="flex justify-center">
          <Button type="submit">Login</Button>
        </div>
      </form>

      <p className="text-center mt-4">
        Do not have an account?{" "}
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
}
