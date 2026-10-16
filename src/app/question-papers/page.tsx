import { getCourseById, Course, QuestionPaper } from "@/services/courseService";
import QuestionPapersClient from "./QuestionPapersFrom";

export default async function QuestionPapersPage() {
  // SSR fetch
  const course: Course = await getCourseById("68bab8c38f2703a15a546215");

  return <QuestionPapersClient course={course} />;
}
