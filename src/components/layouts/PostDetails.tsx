"use client";

import { useAuth } from "@/context/AuthContext";
import { Post as PrismaPost, User } from "@/generated/prisma";
import { formatDate } from "@/utils/formatDate";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "../rich-text-editor";
import { Button } from "../ui/button";

interface Post extends PrismaPost {
  author: User;
}

export interface iBlogPostProps {
  post: Post;
}

export default function PostDetails({ post }: iBlogPostProps) {
  const { user } = useAuth();
  const { id, authorId, title, content, author, createdAt } = post;

  if (!user || !user.id) return <div>Loading...</div>;

  return (
    <>
      <div className="space-x-3">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="me-1.5" /> Back
          </Button>
        </Link>

        {user.id === authorId && (
          <Link href={`/edit/${id}`}>
            <Button variant="outline" size="sm">
              <Edit className="me-1.5" /> Edit Post
            </Button>
          </Link>
        )}
      </div>

      <article className="mt-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="text-muted-foreground mb-6">
          <span>{`${author.firstName} ${author.lastName}`}</span>
          <span> . </span>
          <time>{formatDate(createdAt)}</time>
        </div>

        <RichTextEditor content={content || ""} editable={false} />
      </article>
    </>
  );
}
