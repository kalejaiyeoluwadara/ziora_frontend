"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface TypewriterProps {
  text: string;
  delay?: number; // Delay before starting in ms
  speed?: number; // Typing speed per character in ms
  onComplete?: () => void;
}

export function Typewriter({
  text,
  delay = 300,
  speed = 25,
  onComplete,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  
  // Start animation only when the text is in view
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    if (!isInView) return;

    let timeoutId: NodeJS.Timeout;
    let index = 0;

    const startTyping = () => {
      const type = () => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index));
          index++;
          timeoutId = setTimeout(type, speed);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      };
      type();
    };

    timeoutId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isInView, text, delay, speed, reduceMotion, onComplete]);

  return (
    <span ref={containerRef} className="relative">
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-[2.5px] h-[1.1em] ml-0.5 bg-brand-blue-light animate-[pulse_0.8s_infinite] align-middle" />
      )}
    </span>
  );
}
