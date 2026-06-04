"use client";
import React from "react";

const AVATARS = [
  {
    name: "Interview Mitra",
    emoji: "🎯",
    tagline: "Friendly & Professional",
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.5)]",
    border: "border-cyan-500",
    desc: "Your supportive interview companion",
  },
  {
    name: "DostAI",
    emoji: "🤝",
    tagline: "Casual & Encouraging",
    color: "from-green-500 to-emerald-600",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.5)]",
    border: "border-emerald-500",
    desc: "Like a friend helping you prep",
  },
  {
    name: "Taiyaar",
    emoji: "⚡",
    tagline: "Sharp & Challenging",
    color: "from-yellow-500 to-orange-600",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.5)]",
    border: "border-orange-500",
    desc: "Pushes you to your maximum potential",
  },
  {
    name: "JobYaar",
    emoji: "💼",
    tagline: "Corporate & Formal",
    color: "from-purple-500 to-violet-600",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.5)]",
    border: "border-violet-500",
    desc: "Corporate interview simulation",
  },
  {
    name: "PrepGuru",
    emoji: "📚",
    tagline: "Analytical & Thorough",
    color: "from-pink-500 to-rose-600",
    glow: "shadow-[0_0_20px_rgba(236,72,153,0.5)]",
    border: "border-rose-500",
    desc: "Deep, data-driven feedback",
  },
];

export { AVATARS };

export default function AvatarSelector({ selectedAvatar, onSelect }) {
  return (
    <div className="mt-5 mb-3">
      <label className="text-cyan-400 font-bold block mb-3">
        🤖 Choose Your AI Interviewer
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-2">
        {AVATARS.map((avatar) => {
          const isSelected = selectedAvatar === avatar.name;
          return (
            <button
              key={avatar.name}
              type="button"
              onClick={() => onSelect(avatar.name)}
              className={`relative flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer
                ${isSelected
                  ? `${avatar.border} ${avatar.glow} bg-white/10 scale-105`
                  : "border-gray-700 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800"
                }`}
            >
              {isSelected && (
                <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  ✓
                </span>
              )}
              <span className="text-3xl">{avatar.emoji}</span>
              <span
                className={`text-xs font-bold bg-gradient-to-r ${avatar.color} bg-clip-text text-transparent`}
              >
                {avatar.name}
              </span>
              <span className="text-[10px] text-gray-400 text-center leading-tight">
                {avatar.tagline}
              </span>
            </button>
          );
        })}
      </div>
      {selectedAvatar && (
        <p className="mt-2 text-xs text-gray-400 text-center">
          {AVATARS.find((a) => a.name === selectedAvatar)?.desc}
        </p>
      )}
    </div>
  );
}
