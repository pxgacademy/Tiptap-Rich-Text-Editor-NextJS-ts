"use client";

import { useAuth } from "@/context/AuthContext";
import { updatePost } from "@/lib/action";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import RichTextEditor from "../rich-text-editor";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface iProps {
  id: string;
  oldTitle: string;
  oldContent: string;
  authorId: string;
}

export default function EditPostComponent({
  id,
  oldTitle,
  oldContent,
  authorId,
}: iProps) {
  const { user, loading } = useAuth();
  const [title, setTitle] = useState<string>(oldTitle);
  const [content, setContent] = useState<string>(oldContent);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user || !user.id) {
      return toast.error("Unauthorized user");
    }

    try {
      const result = await updatePost(id, {
        title,
        content,
      });

      if (result.success) {
        toast.success("Post updated successfully");
        router.push(`/posts/${id}`);
      } else {
        toast.error("Failed to update post");
      }

      //
    } catch (error) {
      console.log("Failed to update post: ", error);

      //
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading... </div>;

  useEffect(() => {
    if (!loading && authorId !== user?.id) {
      router.push(`/posts/${id}`);
      toast.error("Your are not permitted to update this post");
    }
  }, [authorId, user, loading, router]);

  return (
    <>
      <Link href={`/posts/${id}`}>
        <Button variant="outline" size="sm">
          <ArrowLeft className="me-1.5" /> Back
        </Button>
      </Link>

      <h1 className="my-5">Edit Post</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a post title"
            className="bg-slate-50 mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </>
  );
}
