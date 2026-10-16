import api from "@/services/api";
import StudentForm from "./RegistrationForm";

import { ApiResponse, Course, Year, Semester } from "@/types/common";

export default async function RegisterPage() {
  const [coursesRes, yearsRes, semestersRes] = await Promise.all([
    api.get<ApiResponse<Course>>("/courses"),
    api.get<ApiResponse<Year>>("/years"),
    api.get<ApiResponse<Semester>>("/semesters"),
  ]);

  const courses = coursesRes.data.success ? coursesRes.data.data : [];
  const years = yearsRes.data.success ? yearsRes.data.data : [];
  const semesters = semestersRes.data.success ? semestersRes.data.data : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 pt-20">
      <StudentForm courses={courses} years={years} semesters={semesters} />
    </div>
  );
}
