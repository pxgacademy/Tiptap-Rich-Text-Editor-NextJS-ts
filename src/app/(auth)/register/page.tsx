"use client";

import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
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
    try {
      await fetcher("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });
      router.push("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Register</h2>
      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}
