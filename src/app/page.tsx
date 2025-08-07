"use client";

import BlogPostList from "@/components/layouts/BlogPostList";
import Container from "@/components/layouts/Container";

export default function Home() {
  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <p className="text-muted-foreground mt-2">
          Explore the latest articles and insights
        </p>
      </div>
      <BlogPostList />
    </Container>
  );
}
