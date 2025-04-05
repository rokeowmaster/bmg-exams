import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full z-50 backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-purple-300 transition-colors duration-200">
          BMG<span className="text-purple-400"> Quiz</span>
        </Link>

        {/* <div className="space-x-6 hidden sm:flex">
          <Link
            href="/about"
            className="text-white/80 hover:text-white transition duration-200 font-medium"
          >
            About
          </Link>
          <Link
            href="/dashboard"
            className="text-white/80 hover:text-white transition duration-200 font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/sign-in"
            className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-200"
          >
            Sign In
          </Link>
        </div> */}
      </div>
    </nav>
  );
}
