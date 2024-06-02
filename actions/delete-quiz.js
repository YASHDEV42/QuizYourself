"use server";
import { ObjectId } from "mongodb";
import { connectDatabase } from "@/helper/db-util";
export const deleteQuiz = async (quiz_id) => {
  const client = await connectDatabase();
  const db = client.db();
  const result = await db
    .collection("quizzes")
    .deleteOne({ _id: new ObjectId(quiz_id) });
  return result;
};
