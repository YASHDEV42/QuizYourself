"use client";
import React from "react";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";
import { MdQuiz } from "react-icons/md";

const Hero = () => {
  return (
    <section>
      <div id="container">
        <h1>Quiz Yourself</h1>
        <h3>
          Explore, create, and challenge yourself <br /> quizzes designed
          specifically for UOLP students.
        </h3>
        <div id="sub-container">
          <button id="primary-btn">
            <Link href="/quizzes">See Quizzes</Link>
          </button>
          <button id="secondary-btn">
            <Link href="/about">About Us</Link>
          </button>
        </div>
      </div>
      <FaGear id="gear" size={300} />
      <MdQuiz id="quizIcon" size={400} />
    </section>
  );
};

export default Hero;
