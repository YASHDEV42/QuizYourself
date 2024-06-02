import React from "react";
import Link from "next/link";
import DeleteButton from "./deleteBtn";
const Profile = ({ id, firstName, lastName, email, quizzes, result }) => {
  return (
    <section id="profile">
      <div id="profile-title">
        <h1>
          Welcome, {firstName} {lastName}
        </h1>
      </div>
      <div id="profile-quizzes">
        <h2>(My Quizzes)</h2>
        <div id="quizzes">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div key={quiz._id} id="quiz">
                <h3>{quiz.title}</h3>
                <DeleteButton id={quiz._id} />
              </div>
            ))
          ) : (
            <h3>You Have No Quizzes Yet</h3>
          )}
        </div>

        <button id="primary-btn">
          <Link href="/quizzes/create-quiz">Create Quiz</Link>
        </button>
      </div>
    </section>
  );
};

export default Profile;
