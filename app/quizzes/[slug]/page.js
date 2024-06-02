import { getDocumentById, connectDatabase } from "@/helper/db-util";
import Quiz from "@/components/quiz";

const SingleQuiz = async ({ params }) => {
  const { slug } = params;
  const client = await connectDatabase();
  const quiz = await getDocumentById(client, "quizzes", slug);
  return <Quiz quiz={quiz} />;
};

export default SingleQuiz;
