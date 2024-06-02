import React from "react";
import { getAllDocuments, connectDatabase } from "@/helper/db-util";

import Link from "next/link";

const AllQuizzes = async () => {
  const client = await connectDatabase();
  const quizzes = await getAllDocuments(client, "quizzes", {
    _id: -1,
  });
  console.log(quizzes);

  return (
    <section id="quizzes">
      <h1>Quizzes</h1>
      <div id="container">
        {quizzes.length === 0 && <h2>No quizzes found</h2>}
        {quizzes.map((quiz) => (
          <div id="quiz-container" key={quiz._id}>
            <Link href={`/quizzes/${quiz.slug}`}>
              <h2>{quiz.title}</h2>
              <div>
                <span id="span">
                  <span>
                    <em>Created By </em>
                  </span>
                  {quiz?.createrName}
                </span>
                <span>{quiz.questions.length} questions</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllQuizzes;
