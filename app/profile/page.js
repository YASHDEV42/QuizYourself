"use server";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Profile from "@/components/profile";
import { connectDatabase, getDocumentByCreater } from "@/helper/db-util";

const ProfilePage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser(); // Get the user object directly

  if (!user) {
    // Handle case where user is not authenticated
    // Example: redirect to login or show an error message
    throw new Error("User is not authenticated");
  }

  const { given_name, family_name, email, id } = user?.user || {}; // Optional chaining

  const client = await connectDatabase();

  // Handle potential errors in fetching quizzes
  let quizzes = [];
  try {
    quizzes = await getDocumentByCreater(client, "quizzes", id, { _id: -1 });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    // You could display an error message to the user here
  }

  return (
    <Profile
      firstName={given_name}
      lastName={family_name}
      email={email}
      id={id}
      quizzes={quizzes}
    />
  );
};

export default ProfilePage;
