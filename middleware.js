import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  async function middleware(req) {
    console.log("look at me", req.kindeAuth);
  },
  {
    isReturnToCurrentPage: true,
    loginPage: "/api/auth/login",
  }
);

export const config = {
  matcher: ["/quizzes", "/quizzes/[slug]", "/profile", "/quizzes/create-quiz"],
};
