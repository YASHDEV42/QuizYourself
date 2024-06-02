"use server";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Profile from "@/components/profile";

import {
  connectDatabase,
  getDocumentByCreater,
  deleteItemById,
} from "@/helper/db-util";

const ProfilePage = async () => {
  const { getUser } = getKindeServerSession();
  const { given_name, family_name, email, id } = await getUser();
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
};

export default ProfilePage;
