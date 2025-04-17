'use client'
import { useState } from 'react';
import Link from 'next/link';
import { courses } from '@/data/courses'; // Assuming you have a data file for courses



export default function MaterialsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 text-white py-20 px-4">
      <h1 className="text-center text-5xl font-bold mb-12">Course Materials</h1>
      <div className="max-w-5xl mx-auto space-y-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="p-6 cursor-pointer hover:bg-gray-700 flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-1">{course.title}</h2>
                <p className="text-gray-400 text-sm">{course.description}</p>
              </div>
              <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
            </div>
            {openIndex === index && (
              <ul className="bg-gray-900 px-6 pb-6 space-y-3 text-gray-300 text-base">
                {course.content.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-20">
        <Link href="/" className="text-blue-400 underline hover:text-blue-300">Back to Home</Link>
      </div>
    </main>
  );
}
