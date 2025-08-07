//

import Container from "@/components/layouts/Container";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Link href={"/"}>
          <Button>
            <PlusIcon className="me-1.5 size-4" /> New Post
          </Button>
        </Link>
      </div>
    </Container>
  );
}
