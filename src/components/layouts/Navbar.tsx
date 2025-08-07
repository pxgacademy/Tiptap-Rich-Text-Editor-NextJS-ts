"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Button } from "../ui/button";
import Container from "./Container";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  if (loading) return <Container>Loading...</Container>;

  return (
    <header className="border-b">
      <div className="container mx-auto py-3 px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          RichText
        </Link>

        <div>
          {user ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
