import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-transparent border-t border-white/5 text-primary-content p-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none"></div>
      <div className="relative z-10 flex flex-col items-center">
        <a href="/" className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
            <span className="text-white font-bold text-xl">Z</span>
          </div>
          <span className="text-2xl font-bold tracking-wider neon-text">ZeroReject</span>
        </a>
        <p className="font-bold text-gray-300">Engineered for Success</p>
        <p className="text-gray-500 mt-2 text-sm">
          Copyright © {new Date().getFullYear()} - All rights reserved by ZeroReject System
        </p>
      </div>
    </footer>
  );
};

export default Footer;
