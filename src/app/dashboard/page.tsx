"use client";

import Container from "@/components/layouts/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Post as PrismaPost, User } from "@/generated/prisma";
import { deletePost, getMyPosts } from "@/lib/action";
import { formatDate } from "@/utils/formatDate";
import DOMPurify from "isomorphic-dompurify";
import { Edit, PlusIcon, Trash2, View } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Post extends PrismaPost {
  author: User;
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const { user, loading } = useAuth();

  const postLoader = async () => {
    setIsLoading(true);
    try {
      if (!user || !user.id) return;
      const result = await getMyPosts(user.id);
      setPosts(result.data as Post[]);
    } catch (error) {
      console.log("Error from getting my posts ui: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    postLoader();
  }, [user, user?.id, loading]);

  const handleDeletePost = async (id: string) => {
    try {
      const result = await deletePost(id);
      if (result.success) {
        postLoader();
        toast.success("Successfully deleted the post");
      } else toast.error(result.message);
    } catch (error) {
      console.log("Error deleting post: ", error);
    }
  };

  if (loading || isLoading) return <Container>Loading...</Container>;
  if (!user || !user.id) redirect("/");

  return (
    <Container>
      <div className="flex items-center justify-between ">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Link href={"/create"}>
          <Button>
            <PlusIcon className="me-1.5 size-4" /> New Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-xl font-medium">
            You haven't created any post yet
          </h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Get started by creating your first post
          </p>
          <Link href="/create">
            <Button>
              <PlusIcon className="me-1.5 size-4" /> Create Your First Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {posts.map(({ title, id, content, author, createdAt }) => (
            <Card key={id} className="w-full transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  {DOMPurify.sanitize(content, {
                    ALLOWED_TAGS: [],
                  })}
                </div>
              </CardContent>
              <CardFooter className="grow-1 flex-col items-start justify-between text-sm text-muted-foreground">
                <div>
                  <time>{formatDate(createdAt)}</time>
                </div>
                <div className="mt-3 space-x-2 flex items-center">
                  <Link href={`/posts/${id}`}>
                    <Button variant="outline" size="sm">
                      <View className="mr-2" /> View
                    </Button>
                  </Link>

                  <Link href={`/edit/${id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2" /> Edit
                    </Button>
                  </Link>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePost(id)}
                  >
                    <Trash2 className="mr-2" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
