//

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

interface iProps {
  id: string;
  title: string;
  content: string;
  author: Record<string, string>;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

const posts: iProps[] = [
  {
    id: "s64ad65sd4",
    title: "Card Title",
    content:
      "<h1>This is Card Content</h1> <h3>This is sub content</h3> <p>This is description</p>",
    author: {
      firstName: "Abul",
      lastName: "Kalam",
    },
    authorId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function BlogPostList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map(({ id, title, content, author, createdAt }) => (
        <Link href={`/posts/${id}`} key={id}>
          <Card className="w-full transition-all hover:shadow-md">
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
