import ProtectedLayout from "@/components/ProtectedLayout";
import { getCourseById } from "@/services/courseService";
import ExamTimetableClient from "@/app/exam-timetable/ExamTimetableClientFrom";

export default async function ExamTimetablePage() {
  const course = await getCourseById("68bab8c38f2703a15a546215"); // replace with dynamic ID if needed

  return (
    <ProtectedLayout>
      <ExamTimetableClient course={course} />
    </ProtectedLayout>
  );
}
