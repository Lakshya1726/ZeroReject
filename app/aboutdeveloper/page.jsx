import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import Header from "../dashboard/_components/Header";
import Footer from "../dashboard/_components/Footer";

const page = () => {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col justify-between">
      <Header />
      <div className="flex-grow flex justify-center items-center p-6">
        <div className="w-full max-w-md mt-10 mb-10">
          <article className="group relative rounded-2xl bg-card border border-cyan-500/30 shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:shadow-[0_0_35px_rgba(236,72,153,0.3)] hover:border-pink-500/50 transition-all duration-500 flex flex-col overflow-hidden">
            <div className="relative w-full aspect-square">
              <img
                alt="Lakshya Aryan"
                src="/lakshya.jpg"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            </div>

            <div className="p-6 relative z-10 -mt-16">
              <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 drop-shadow-lg mb-2">
                About Me
              </h3>

              <p className="mt-2 text-justify text-sm/relaxed text-gray-300 leading-relaxed font-medium">
                I am <span className="text-cyan-400 font-bold">Lakshya Aryan</span>, the developer behind ZeroReject, a
                powerful AI-driven mock interview application. Built with
                React, Tailwind CSS, NextJS, and Gemini AI, the app features a sleek UI
                designed to help candidates practice and perfect their interview skills.
              </p>
              
              <div className="mt-6 flex gap-4 items-center justify-center border-t border-white/10 pt-5">
                <a
                  target="_blank"
                  href="https://github.com/Lakshya1726"
                  className="cursor-pointer text-gray-400 hover:text-cyan-400 transform hover:scale-110 transition-all duration-300 bg-white/5 p-3 rounded-full hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                >
                  <FiGithub style={{ fontSize: "24px" }} />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/lakshya-aryan-963115256"
                  className="cursor-pointer text-gray-400 hover:text-pink-500 transform hover:scale-110 transition-all duration-300 bg-white/5 p-3 rounded-full hover:bg-pink-500/10 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                >
                  <FaLinkedinIn style={{ fontSize: "24px" }} />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
