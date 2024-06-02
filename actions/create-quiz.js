"use server";
import { connectDatabase } from "@/helper/db-util";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getAllDocuments } from "@/helper/db-util";

export const createQuiz = async (prevState, formData) => {
  const { getUser } = getKindeServerSession();
  const createrId = (await getUser()).id;
  const createrName =
    (await getUser()).given_name + " " + (await getUser()).family_name;
  const { title, questions } = formData;

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");

  // Convert choices string into an array for each question
  const formattedQuestions = questions.map((question) => ({
    ...question,
    choices: question.choices.split(",").map((choice) => choice.trim()), // Split the string by commas and trim each choice
  }));
  const client = await connectDatabase();
  const quizzes = await getAllDocuments(client, "quizzes", {
    _id: -1,
  });
  for (let i = 0; i < quizzes.length; i++) {
    if (quizzes[i].slug === slug) {
      return {
        error: ["Quiz with the same title already exists"],
      };
    }
  }

  const newQuiz = {
    title,
    questions: formattedQuestions,
    slug,
    createrName,
    createrId,
  };

  console.log(newQuiz);
  let error = [];
  if (!title) {
    error.push("Title is required");
  }
  if (questions.length < 6) {
    error.push("At least six questions are required");
  }
  for (let i = 0; i < questions.length; i++) {
    if (!questions[i].question.trim()) {
      error.push(`Question ${i + 1} cannot be empty`);
    }
    if (questions[i].choices.length < 2) {
      error.push(`Question ${i + 1} must have at least two choices`);
    }
    if (
      questions[i].answer < 0 ||
      questions[i].answer >= questions[i].choices.length
    ) {
      error.push(`Question ${i + 1} has an invalid answer selection`);
    }
  }

  if (error.length) {
    console.log(error);
    return {
      error,
    };
  }

  const db = client.db();
  const result = await db.collection("quizzes").insertOne(newQuiz);
  redirect("/profile");
};
