"use client";

import { useState, useEffect, useRef } from "react";
import { questions } from "@/data/questions";
import Timer from "@/components/Timer";
import Navbar from "@/components/Navbar";
import html2canvas from "html2canvas";
import { PartyPopper } from "lucide-react";

export default function QuizPage() {
  const topics = Object.keys(questions);
  const [currentTopicIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [topicScore, setTopicScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [topicResults, setTopicResults] = useState([]);
  const [timerKey] = useState(0);
  const [quizAlreadyTaken, setQuizAlreadyTaken] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => {
    const hasTakenQuiz = localStorage.getItem("bmg-quiz-taken");
    if (hasTakenQuiz) {
      setQuizAlreadyTaken(true);
    }
  }, []);

  const topic = topics[currentTopicIndex];
  const currentQuestion = questions[topic][currentQuestionIndex];

  const handleAnswer = (selected) => {
    const correct = currentQuestion.answer;

    if (selected === correct) {
      setScore((prev) => prev + 1);
      setTopicScore((prev) => prev + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Incorrect! Correct answer: ${correct}`);
    }

    setTimeout(() => {
      setFeedback("");

      const isLastQuestion =
        currentQuestionIndex === questions[topic].length - 1;
      if (isLastQuestion) {
        const updatedResults = [
          {
            topic,
            score: topicScore + (selected === correct ? 1 : 0),
            total: questions[topic].length,
          },
        ];
        setTopicResults(updatedResults);
        localStorage.setItem("bmg-quiz-taken", "true");
        setQuizCompleted(true);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 1000);
  };

  const sendResultsToWhatsApp = () => {
    html2canvas(resultRef.current).then((canvas) => {
      // Convert canvas to image data URL
      const imageUrl = canvas.toDataURL();

      // Send the image to the backend (Twilio service)
      fetch("/api/send-whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          phoneNumber: "whatsapp:+254758490103", // WhatsApp number
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Results sent to WhatsApp!");
          } else {
            alert("Failed to send the results.");
          }
        })
        .catch((error) => {
          console.error("Error sending results:", error);
          alert("An error occurred while sending the results.");
        });
    });
  };

  if (quizAlreadyTaken) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10 p-6">
          <h2 className="text-3xl font-bold mb-4 text-red-600">
            ⛔ Quiz Already Taken
          </h2>
          <p className="text-lg">
            You’ve already completed this quiz. Only one attempt is allowed.
          </p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 min-h-screen text-white">
        <Navbar />
        <div
          className="flex flex-col items-center justify-center py-16 px-6"
          ref={resultRef}
        >
          <PartyPopper size={48} className="text-yellow-400 mb-4 animate-bounce" />
          <h2 className="text-5xl font-extrabold mb-4">🎉 Topic Complete!</h2>
          <p className="text-2xl mb-8">You completed the topic with a score of</p>
          <div className="bg-white text-black px-8 py-6 rounded-xl shadow-2xl text-4xl font-bold mb-8">
            {topicScore} / {questions[topic].length}
          </div>

          <div className="w-full max-w-xl bg-white text-black rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📊 Topic Breakdown</h3>
            {topicResults.map((res, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b">
                <span>{res.topic}</span>
                <span>
                  {res.score} / {res.total}
                </span>
              </div>
            ))}
          </div>

          {/* <button
            className="mt-10 bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition"
            onClick={sendResultsToWhatsApp}
          >
            📱 Send Results to WhatsApp
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto text-center bg-white rounded-lg shadow mt-6">
        <h2 className="text-2xl font-bold mb-2 text-black">{topic}</h2>
        <Timer key={timerKey} seconds={1800} />

        <div className="mt-6">
          <p className="text-lg font-medium mb-4 text-black">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </p>
          <div className="grid gap-3">
            {currentQuestion.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
