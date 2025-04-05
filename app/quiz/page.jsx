"use client";
import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import Timer from "@/components/Timer";
import Navbar from "@/components/Navbar";

export default function QuizPage() {
  const topics = Object.keys(questions);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [topicScore, setTopicScore] = useState(0);
  const [showTopicResult, setShowTopicResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [topicResults, setTopicResults] = useState([]);
  const [timerKey, setTimerKey] = useState(0);
  const [quizAlreadyTaken, setQuizAlreadyTaken] = useState(false);

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

      const isLastQuestion = currentQuestionIndex === questions[topic].length - 1;

      if (isLastQuestion) {
        setShowTopicResult(true);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 1000);
  };

  const handleNextTopic = () => {
    const updatedResults = [...topicResults, {
      topic,
      score: topicScore,
      total: questions[topic].length,
    }];
    setTopicResults(updatedResults);

    const isLastTopic = currentTopicIndex === topics.length - 1;
    if (isLastTopic) {
      localStorage.setItem("bmg-quiz-taken", "true"); // mark quiz as completed
      setQuizCompleted(true);
    } else {
      setCurrentTopicIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
      setTopicScore(0);
      setShowTopicResult(false);
      setTimerKey((prev) => prev + 1); // Reset Timer
    }
  };

  if (quizAlreadyTaken) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10 p-6">
          <h2 className="text-3xl font-bold mb-4 text-red-600">⛔ Quiz Already Taken</h2>
          <p className="text-lg">You’ve already completed this quiz. Only one attempt is allowed.</p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10 p-6">
          <h2 className="text-3xl font-bold mb-4">🎉 Final Score: {score}</h2>
          <div className="mt-4">
            {topicResults.map((res, idx) => (
              <p key={idx} className="text-lg">
                {res.topic}: {res.score} / {res.total}
              </p>
            ))}
          </div>
          <button
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
            onClick={() => window.print()}
          >
            🏆 Download Certificate
          </button>
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

        {showTopicResult ? (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-black">Topic Complete!</h3>
            <p className="mt-2 text-lg text-black">
              You scored {topicScore} out of {questions[topic].length}
            </p>
            <button
              onClick={handleNextTopic}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded"
            >
              ➡️ Proceed to Next Topic
            </button>
          </div>
        ) : (
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
            {/* {feedback && <p className="mt-4 font-semibold text-lg text-black">{feedback}</p>} */}
          </div>
        )}
      </div>
    </div>
  );
}
