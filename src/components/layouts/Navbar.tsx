//

import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto py-3 px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          RichText
        </Link>

        <div>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
