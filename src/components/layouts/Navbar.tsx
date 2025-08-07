//

import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-3">
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
