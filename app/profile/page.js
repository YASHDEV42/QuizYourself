"use server";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Profile from "@/components/profile";
import { connectDatabase, getDocumentByCreater } from "@/helper/db-util";

const ProfilePage = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      // Handle the case where the user is not authenticated or user data is null
      return <p>User is not authenticated</p>;
    }

    const { given_name, family_name, email, id } = user;

    const client = await connectDatabase();
    const quizzes = await getDocumentByCreater(client, "quizzes", id, {
      _id: -1,
    });

    return (
      <Profile
        firstName={given_name}
        lastName={family_name}
        email={email}
        id={id}
        quizzes={quizzes || []}
      />
    );
  } catch (error) {
    console.error("Error loading profile page:", error);
    return <p>Failed to load profile. Please try again later.</p>;
  }
};

export default ProfilePage;
