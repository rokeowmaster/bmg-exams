"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, course, phone } = formData;
    const message = `Hello, I would like to register.\nName: ${name}\nCourse: ${course}\nPhone: ${phone}`;
    const url = `https://wa.me/254710591133?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setShowForm(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-950 text-white font-sans overflow-hidden relative">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-24 px-6"
      >
        <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight">
          Welcome to BMG College
        </h1>
        <p className="text-2xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Your gateway to professional computer skills. Learn online, gain confidence, and unlock your tech future.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-full transition-transform hover:scale-105 shadow-lg"
        >
          Register
        </button>
      </motion.section>

      {/* Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl w-[90%] max-w-md text-white relative"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-xl font-bold text-gray-300 hover:text-white"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center">Register Now</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="text"
                required
                placeholder="Course of Interest"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Quiz Call To Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex-1 flex items-center justify-center p-6"
      >
        <div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-6">
              🚀 <span className="text-purple-400">BMG Quiz</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Test your skills on Computers, Microsoft Office and Internet essentials.
              Get started with sequential quizzes to earn your certificate!
            </p>
            <Link
              href="/quiz"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
            >
              Start Quiz
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Courses Overview */}
      <motion.section
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="px-10 py-20 bg-gray-900"
      >
        <section className="px-10 py-20 bg-gray-900 animate-slide-in">
        <h2 className="text-4xl font-bold text-center mb-14 tracking-wide">Available Study Topics</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-3">Introduction to Computers</h3>
            <p className="text-gray-400">Explore the basics of computing, types of computers, and their applications in daily life and business environments.</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-3">Microsoft Windows</h3>
            <p className="text-gray-400">Learn how to use the Windows operating system effectively – from navigation and file management to customization.</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-3">Microsoft Word</h3>
            <p className="text-gray-400">Master document creation, formatting, tables, and templates – perfect for letters, CVs, and professional reports.</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-3">Microsoft Publisher</h3>
            <p className="text-gray-400">Design eye-catching posters, brochures, flyers, and business cards with professional layout tools.</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-3">Microsoft PowerPoint</h3>
            <p className="text-gray-400">Create engaging presentations with animations, transitions, and multimedia for school, business, or events.</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-3">Microsoft Excel</h3>
            <p className="text-gray-400">Learn spreadsheets, formulas, charts, and data analysis to boost productivity in business and academia.</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-3">Microsoft Access</h3>
            <p className="text-gray-400">Understand database creation, queries, and reports to manage data efficiently in small business and projects.</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-3">Internet & Web</h3>
            <p className="text-gray-400">Explore web browsing, email, social media, and online safety, plus an introduction to web design concepts.</p>
          </div>
        </div>
      </section>
      </motion.section>

      {/* Study Materials Link */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-16"
      >
        <h2 className="text-3xl font-semibold mb-6">Access Study Materials</h2>
        <Link
          href="/courses"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg"
        >
          Go to Materials Page
        </Link>
      </motion.section>

      <footer className="text-center py-6 text-gray-400 text-sm">
        © 2025 BMG College. All rights reserved.
      </footer>
    </main>
  );
}
