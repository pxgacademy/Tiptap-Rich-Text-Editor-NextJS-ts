//

import { Post as PrismaPost, User } from "@/generated/prisma";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "./../../utils/formatDate";

interface Post extends PrismaPost {
  author: User;
}

interface iBlogPostProps {
  posts: Post[];
}

export default function BlogPostList({ posts }: iBlogPostProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map(({ id, title, content, author, createdAt }) => (
        <Link href={`/posts/${id}`} key={id}>
          <Card className="w-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground line-clamp-2">
                {DOMPurify.sanitize(content, {
                  ALLOWED_TAGS: [],
                })}
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <div>
                <span>{`${author.firstName} ${author.lastName}`}</span>
                <span> . </span>
                <time>{formatDate(createdAt)}</time>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
