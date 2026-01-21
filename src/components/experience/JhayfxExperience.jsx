import React from "react";
import { ArrowRight } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function JhayfxExperience() {
  const tasks = [
    {
      text: "Maintained and updated the company landing page to ensure it remained active, functional, and visually aligned with brand standards.",
    },
    {
      text: "Implemented responsive design principles to ensure optimal viewing experience across all devices and screen sizes.",
    },
    {
      text: "Debugged and fixed frontend issues, improving overall performance and user experience of web pages.",
    },
    {
      text: "Collaborated with team members to understand project requirements and deliver high-quality web solutions.",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-between gap-3 px-4 md:px-0 lg:flex-row xl:gap-5"
      >
        <div className="flex w-full flex-col space-y-3">
          <div className="flex flex-col space-y-2">
            {/* Title */}
            <div className="flex items-center justify-between">
              <span className="text-base font-medium tracking-wide text-gray-100 sm:text-2xl">
                Web Developer
              </span>
              <span className="text-sm">Remote</span>
            </div>

            <div className="flex flex-col items-start justify-between font-mono text-sm font-bold text-heading sm:flex-row sm:items-center sm:text-base">
              {/* Company name */}
              <span>Jhayfx Trading Academy</span>

              {/* Date */}
              <span>2024 – 2025</span>
            </div>
          </div>

          <div className="flex flex-col space-y-1 text-sm sm:text-base">
            {tasks.map((item, index) => (
              <div key={index} className="flex flex-row space-x-2">
                <ArrowRight className="h-5 w-4 flex-none" />
                <span>{item.text}</span>
              </div>
            ))}

            <div className="flex flex-row space-x-2">
              <ArrowRight className="h-5 w-4 flex-none" />
              <span className="font-bold text-heading">
                Technologies used: React.js, Vue.js, Next.js, Tailwind CSS,
                JavaScript, TypeScript, HTML5, CSS3.
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
