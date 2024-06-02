import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
const KindeLogIn = async () => {
  const { isAuthenticated } = getKindeServerSession();

  return (await isAuthenticated()) ? (
    <>
      <Link id="nav-link" href="/profile">
        My Profile
      </Link>
      <LogoutLink id="nav-link">Sign Out</LogoutLink>
    </>
  ) : (
    <>
      <LoginLink id="nav-link">Sign In</LoginLink>
      <RegisterLink id="nav-link">Sign Up</RegisterLink>
    </>
  );
};

export default KindeLogIn;
