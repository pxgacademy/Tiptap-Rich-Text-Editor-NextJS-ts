//

import Container from "@/components/layouts/Container";
import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Post as PrismaPost, User } from "@/generated/prisma";
import { getPostById } from "@/lib/action";
import { formatDate } from "@/utils/formatDate";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Post extends PrismaPost {
  author: User;
}

type iBlogPostProps = Post;

export default async function PostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const post = await getPostById(id);

  if (!post) return notFound();

  const { title, content, author, createdAt } = post.data as iBlogPostProps;

  return (
    <Container>
      <Link href={"/"}>
        <Button variant="outline" size="sm">
          <ArrowLeft className="me-1.5" /> Back
        </Button>
      </Link>

      <article className="mt-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="text-muted-foreground mb-6">
          <span>{`${author.firstName} ${author.lastName}`}</span>
          <span> . </span>
          <time>{formatDate(createdAt)}</time>
        </div>

        <RichTextEditor content={content || ""} editable={false} />
      </article>
    </Container>
  );
}
