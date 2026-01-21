"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  "<Hello /> 👋",
  "Welcome ✨",
  "Code & Create 💻",
  "Let's Build 🚀",
  "Joel ⚡",
];

export default function PageLoader() {
  const [hydrated, setHydrated] = useState(false);
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [progress, setProgress] = useState(0);

  /* -------------------- Hydration -------------------- */
  useEffect(() => {
    setHydrated(true);

    // remove instant CSS loader from layout.jsx
    setTimeout(() => {
      const el = document.getElementById("initial-loader");
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, 100);
  }, []);

  /* -------------------- Typing Effect -------------------- */
  useEffect(() => {
    if (!hydrated) return;

    const text = messages[index];
    let charIndex = 0;

    setDisplayedText("");
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        // move to next message after pause
        setTimeout(() => {
          setIndex((i) => (i + 1) % messages.length);
        }, 700);
      }
    }, 65);

    return () => clearInterval(typingInterval);
  }, [index, hydrated]);

  /* -------------------- Progress Animation -------------------- */
  useEffect(() => {
    if (!hydrated) return;

    const timer = setInterval(() => {
      setProgress((p) => (p >= 95 ? 20 : p + 1));
    }, 40);

    return () => clearInterval(timer);
  }, [hydrated]);

  if (!hydrated) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />

      {/* Spotlight */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.15), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-center gap-8 sm:gap-10">
        {/* Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="
              text-center font-bold tracking-tight text-white leading-tight
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              max-w-[22ch] sm:max-w-[26ch] md:max-w-[32ch]
            "
          >
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-1 h-[1em] w-[2px] bg-white align-middle"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress */}
        <div className="w-full max-w-sm space-y-2">
          <div className="flex justify-between text-xs text-white/50">
            <span>Loading experience…</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="relative h-[4px] bg-white/10 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              style={{ width: `${progress}%` }}
            />
            <motion.div
              className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  );
}
