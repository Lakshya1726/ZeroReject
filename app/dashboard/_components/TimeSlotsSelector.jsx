"use client";
import React from "react";

const TIME_SLOTS = [
  {
    duration: "15",
    label: "15 min",
    emoji: "⚡",
    questions: 5,
    tag: "Quick Practice",
    color: "from-green-500 to-emerald-600",
    border: "border-emerald-500",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
  },
  {
    duration: "30",
    label: "30 min",
    emoji: "🎯",
    questions: 10,
    tag: "Standard Prep",
    color: "from-cyan-500 to-blue-600",
    border: "border-cyan-500",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.4)]",
  },
  {
    duration: "45",
    label: "45 min",
    emoji: "🔥",
    questions: 15,
    tag: "Deep Dive",
    color: "from-orange-500 to-red-600",
    border: "border-orange-500",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.4)]",
  },
  {
    duration: "60",
    label: "60 min",
    emoji: "🏆",
    questions: 20,
    tag: "Full Simulation",
    color: "from-purple-500 to-violet-600",
    border: "border-violet-500",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.4)]",
  },
];

export { TIME_SLOTS };

export function getQuestionCount(duration) {
  const slot = TIME_SLOTS.find((s) => s.duration === duration);
  return slot ? slot.questions : 10;
}

export default function TimeSlotsSelector({ selectedDuration, onSelect }) {
  return (
    <div className="mt-5 mb-3">
      <label className="text-cyan-400 font-bold block mb-3">
        ⏱ Interview Duration
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TIME_SLOTS.map((slot) => {
          const isSelected = selectedDuration === slot.duration;
          return (
            <button
              key={slot.duration}
              type="button"
              onClick={() => onSelect(slot.duration)}
              className={`relative flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer
                ${isSelected
                  ? `${slot.border} ${slot.glow} bg-white/10 scale-105`
                  : "border-gray-700 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800"
                }`}
            >
              {isSelected && (
                <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  ✓
                </span>
              )}
              <span className="text-2xl">{slot.emoji}</span>
              <span
                className={`text-sm font-bold bg-gradient-to-r ${slot.color} bg-clip-text text-transparent`}
              >
                {slot.label}
              </span>
              <span className="text-[11px] text-gray-300 font-medium">
                {slot.questions} Questions
              </span>
              <span className="text-[10px] text-gray-500">{slot.tag}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
