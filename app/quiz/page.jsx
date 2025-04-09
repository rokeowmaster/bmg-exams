'use client';
import { useState, useEffect, useRef } from "react";
import { questions } from "@/data/questions";
import Timer from "@/components/Timer";
import Navbar from "@/components/Navbar";
import { PartyPopper } from "lucide-react";

export default function QuizPage() {
  const topics = Object.keys(questions);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [topicScore, setTopicScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [topicResults, setTopicResults] = useState([]);
  const [timerKey, setTimerKey] = useState(0);
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("bmg-quiz-topics");
    if (stored) {
      setCompletedTopics(JSON.parse(stored));
    }
  }, []);

  if (!selectedTopic) {
    return (
      <div>
        <Navbar />
        <div className="p-6 max-w-3xl mx-auto text-center bg-white rounded-lg shadow mt-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Select a Topic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((topic, index) => (
              <button
                key={index}
                onClick={() => {
                  if (completedTopics.includes(topic)) return;
                  setSelectedTopic(topic);
                  setTimerKey(prev => prev + 1);
                }}
                disabled={completedTopics.includes(topic)}
                className={`py-2 px-4 rounded transition text-white ${completedTopics.includes(topic) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
              >
                {topic} {completedTopics.includes(topic) && "(Done)"}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const topic = selectedTopic;
  const currentQuestion = questions[topic]?.[currentQuestionIndex]; // Safe access

  // Prevent errors if currentQuestion is undefined
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

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
        const updatedResults = [
          {
            topic,
            score: topicScore + (selected === correct ? 1 : 0),
            total: questions[topic].length,
          },
        ];
        setTopicResults(updatedResults);

        const updatedCompletedTopics = [...completedTopics, topic];
        setCompletedTopics(updatedCompletedTopics);
        localStorage.setItem("bmg-quiz-topics", JSON.stringify(updatedCompletedTopics));

        setQuizCompleted(true);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 1000);
  };

  const sendResultsToWhatsApp = () => {
    const resultsMessage = `I completed the topic "${selectedTopic}" with a score of ${topicScore} out of ${questions[topic].length}.`;

    // Construct the WhatsApp message URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+254758490103&text=${encodeURIComponent(resultsMessage)}`;

    // Open the WhatsApp link
    window.open(whatsappUrl, "_blank");
  };

  if (quizCompleted) {
    return (
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 min-h-screen text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-16 px-6">
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
                <span>{res.score} / {res.total}</span>
              </div>
            ))}
          </div>

          <button
            className="mt-10 bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition"
            onClick={sendResultsToWhatsApp}
          >
            📱 Send
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
