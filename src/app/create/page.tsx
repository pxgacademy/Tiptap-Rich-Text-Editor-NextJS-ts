//

"use client";

import Container from "@/components/layouts/Container";
import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { createPost } from "@/lib/action";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function CreatePage() {
  const { user, loading } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user || !user.id) {
      return toast.error("Unauthorized user");
    }

    try {
      const result = await createPost({
        title,
        content,
        authorId: user.id,
      });

      if (result.success) {
        toast.success("Post created successfully");
        router.push("/");
      } else {
        toast.error("Failed to create post");
      }

      //
    } catch (error) {
      console.log("Failed to create post: ", error);

      //
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );

  return (
    <Container>
      <Link href={"/"}>
        <Button variant="outline" size="sm">
          <ArrowLeft className="me-1.5" /> Back
        </Button>
      </Link>

      <h1 className="my-5">Create New Post</h1>

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
          {isSubmitting ? "Creating..." : "Create Post"}
        </Button>
      </form>
    </Container>
  );
}
