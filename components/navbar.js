import Link from "next/link";
import React from "react";
import KindeLogIn from "./kinde-login";

const Navbar = () => {
  return (
    <navigator>
      <div id="navbar">
        <div id="logo">
          <h2>
            <Link href="/">Quiz Yourself</Link>
          </h2>
        </div>
        <div id="nav-links">
          <Link href="/quizzes" id="nav-link">
            Quizzes
          </Link>
          <Link href="/quizzes/create-quiz" id="nav-link">
            Create Quiz
          </Link>
          <KindeLogIn />
        </div>
      </div>
    </navigator>
  );
};

export default Navbar;
