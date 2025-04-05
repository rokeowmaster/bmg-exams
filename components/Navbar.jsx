import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between text-white">
      <Link href="/">
      <h1 className="text-xl font-bold">BMG Quiz</h1>
      </Link>
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
}
