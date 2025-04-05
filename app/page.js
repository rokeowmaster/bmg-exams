"use client";
import { ClerkProvider, RedirectToSignIn, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Auth } from "@/components";
import Link from "next/link";

export default function Layout({ children }) {
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useUser();
  const router = useRouter();

  // Wait for Clerk to be fully loaded
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          {isSignedIn ? (
            <div className="p-6">
              <div>
                <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center p-4">
                  <h1 className="text-4xl font-bold mb-4">Welcome to BMG Quiz</h1>
                  <p className="mb-6 text-lg max-w-xl">Test your knowledge on Computers, Microsoft Office, and the Internet. Sign in to get started with sequential quizzes and earn your certificate!</p>
                  <Auth />
                  <Link href="/quiz" className="mt-6 inline-block bg-white text-purple-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-200">Start Quiz</Link>
                </div>
              </div>
            </div>
          ) : (
            <RedirectToSignIn />
          )}
        </div>
      </div>
    
  );
}
