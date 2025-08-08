//

import Container from "@/components/layouts/Container";
import EditPostComponent from "@/components/layouts/EditPostComponent";
import { getPostById } from "@/lib/action";
import { notFound } from "next/navigation";

export default async function EdiPost(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const post = await getPostById(id);
  if (!post) return notFound();

  return (
    <Container>
      <EditPostComponent
        id={id}
        oldTitle={post.data?.title || ""}
        oldContent={post.data?.content || ""}
        authorId={post.data?.authorId || ""}
      />
    </Container>
  );
}
