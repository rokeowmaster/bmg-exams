"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1e1e2f] via-[#1b1b2d] to-[#0f0f1f] text-white">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 transition-all duration-300 ease-in-out hover:shadow-purple-500/30">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-6 animate-fade-in">
              🚀 Welcome to <span className="text-purple-400">BMG Quiz</span>
            </h1>

            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Test your skills on Computers, Microsoft Office, and Internet essentials.
              Sign in and get started with sequential quizzes to earn your digital certificate!
            </p>

            <Link
              href="/quiz"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
            >
              Start Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
