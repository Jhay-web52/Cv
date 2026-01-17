"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  "Hello 👋",
  "नमस्ते 🙏",
  "Hola 👋",
  "Ciao 👋",
  "Bonjour 👋",
  "Olá 👋",
];

export default function PageLoader() {
  const [hydrated, setHydrated] = useState(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Hydration + remove CSS loader
  useEffect(() => {
    setHydrated(true);

    // 🔥 REMOVE instant CSS loader
    const el = document.getElementById("initial-loader");
    if (el) el.remove();
  }, []);

  // Typing effect
  useEffect(() => {
    if (!hydrated) return;

    const currentMessage = messages[index];
    setDisplayedText("");
    setIsTyping(true);

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setDisplayedText(currentMessage.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [index, hydrated]);

  // Progress bar
  useEffect(() => {
    if (!hydrated) return;

    const total = 8000;
    const step = 50;
    const inc = (step / total) * 100;

    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + inc));
    }, step);

    return () => clearInterval(timer);
  }, [hydrated]);

  // Language cycle
  useEffect(() => {
    if (!hydrated) return;

    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 1200);

    return () => clearTimeout(t);
  }, [index, hydrated]);

  // Auto hide
  useEffect(() => {
    if (!hydrated) return;

    const t = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(t);
  }, [hydrated]);

  if (!hydrated || !visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />

      {/* Soft spotlight */}
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
      <div className="relative z-10 flex flex-col items-center gap-10 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
          >
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-[1em] bg-white ml-1 align-middle"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress */}
        <div className="w-full max-w-sm space-y-2">
          <div className="flex justify-between text-xs text-white/50">
            <span>Loading portfolio</span>
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

      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  );
}
