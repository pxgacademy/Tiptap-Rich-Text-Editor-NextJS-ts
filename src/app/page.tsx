"use client";

import BlogPostList from "@/components/layouts/BlogPostList";
import { useState } from "react";

export default function Home() {
  const [post, setPost] = useState("");

  const onChange = (content: string) => {
    setPost(content);
  };

  return (
    <main className="container mx-auto mt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <p className="text-muted-foreground mt-2">
          Explore the latest articles and insights
        </p>
      </div>
      <BlogPostList />
    </main>
  );
}
