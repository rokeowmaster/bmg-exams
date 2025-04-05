// import { questions } from "../data/questions.js";
// import { Timer } from "./Timer.js";
// import { Results } from "./Results.js";

// let currentTopicIndex = 0;
// const topics = Object.keys(questions);
// let score = 0;

// export function Quiz() {
//     if (currentTopicIndex >= topics.length) {
//         Results(score);
//         return;
//     }

//     const topic = topics[currentTopicIndex];
//     const questionList = questions[topic];

//     let quizHTML = `<h2>${topic}</h2><div id="timer"></div>`;
    
//     questionList.forEach((q, index) => {
//         quizHTML += `
//             <div>
//                 <p>${index + 1}. ${q.question}</p>
//                 ${q.options.map(opt => `<button onclick="checkAnswer('${opt}', '${q.answer}')">${opt}</button>`).join("")}
//             </div>
//         `;
//     });

//     document.getElementById("quiz-container").innerHTML = quizHTML;
//     Timer(1800); // Start 30-minute timer
// }

// window.checkAnswer = function (selected, correct) {
//     if (selected === correct) score++;
    
//     if (++currentTopicIndex < topics.length) {
//         Quiz(); // Move to next topic
//     } else {
//         Results(score);
//     }
// };
import React from 'react'

const Quiz = () => {
  return (
    <div>Quiz</div>
  )
}

export default Quiz