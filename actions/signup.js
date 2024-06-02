"use server";
import { connectDatabase } from "@/helper/db-util";
import { redirect } from "next/navigation";
export const createUser = async (prevState, formData) => {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const client = await connectDatabase();
  const db = client.db();
  const existingUser = await db.collection("users").findOne({ email: email });
  const existingUsername = await db
    .collection("users")
    .findOne({ username: username });

  let errors = [];

  if (existingUser) {
    errors.push("This Email Has Been Used");
  }
  if (existingUsername) {
    errors.push("This Username Has Been Used");
  }
  if (email === "" || username === "" || password === "") {
    errors.push("Please Fill Out All Fields");
  }
  if (password.length < 6) {
    errors.push("Password Must Be At Least 6 Characters");
  }
  if (email.includes("@") === false) {
    errors.push("Please Enter A Valid Email");
  }
  if (errors.length > 0) {
    return { errors };
  }

  const result = await db
    .collection("users")
    .insertOne({ username: username, email: email, password });
  console.log(result);
  redirect("/");
};
