'use client';
import { useEffect, useState } from "react";

export default function Timer({ seconds }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  return <p className="text-lg text-black">Time Left: {minutes}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</p>;
}
