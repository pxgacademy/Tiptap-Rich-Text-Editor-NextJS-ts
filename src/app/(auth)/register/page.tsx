"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { createUser } from "@/lib/action";
import { LocalUserInputs } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await createUser({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
      });

      if (result.success) {
        toast.success(result.message);
        const { id, email, firstName, lastName } =
          result.data as LocalUserInputs;
        login({ id, email, firstName, lastName });
        router.push("/");
      } else toast.error(result.message);
    } catch (error) {
      console.log("Error from registering user ui: ", error);
      toast.error("Something error with registering", {
        description: error instanceof Error && error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border  rounded-xl mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-center uppercase">Register</h2>
        <Input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />

        <Input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />

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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
}
