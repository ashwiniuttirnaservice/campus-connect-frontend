"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiBookOpen, FiDownload } from "react-icons/fi";
import ProtectedLayout from "@/components/ProtectedLayout";
import Cookies from "js-cookie";
import { getStudentById, Student, Year } from "@/services/studentService";

interface Subject {
  subjectName: string;
  syllabusPdf?: string;
}

interface Semester {
  _id: string;
  semesterName: string;
  description: string;
  subjects: Subject[];
  yearId: Year;
}

interface FormValues {
  semesterName?: string;
  description?: string;
  yearId?: string;
  yearDescription?: string;
}

export default function SemesterPage() {
  const [semester, setSemester] = useState<Semester | null>(null);
  const [loading, setLoading] = useState(true);
  const { register, reset } = useForm<FormValues>();

  useEffect(() => {
    const fetchStudentSemester = async () => {
      const studentId = Cookies.get("studentId");
      if (!studentId) {
        setLoading(false);
        return;
      }

      try {
        const student: Student & { semesterId?: Semester } =
          await getStudentById(studentId);

        if (student.semesterId) {
          setSemester(student.semesterId);

          reset({
            semesterName: student.semesterId.semesterName,
            description: student.semesterId.description,
            yearId: student.year.yearName,
            yearDescription: student.year.description,
          });
        }
      } catch (err) {
        console.error("Error fetching student semester:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentSemester();
  }, [reset]);

  // Skeleton Loader
  if (loading) {
    return (
      <ProtectedLayout>
        <div className="p-4 sm:p-6 max-w-6xl mx-auto pt-20">
          <div className="animate-pulse">
            <div className="h-10 w-1/3 bg-gray-300 rounded mb-6"></div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4">
              <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-100 rounded"></div>
              <div className="h-10 w-1/2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  if (!semester)
    return (
      <ProtectedLayout>
        <p className="p-6 text-gray-500 text-center">No semester found.</p>
      </ProtectedLayout>
    );

  return (
    <ProtectedLayout>
      <div className="p-4 sm:p-6 max-w-6xl mx-auto pt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-[rgb(0,51,102)] mb-6">
          📘 Semester
        </h1>

        <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition p-6">
          {/* Semester Header */}
          <div className="flex items-center gap-3 mb-4">
            <FiBookOpen className="text-[rgb(0,51,102)] text-xl sm:text-2xl" />
            <h2
              className="text-xl sm:text-2xl font-semibold text-[rgb(0,51,102)]"
              {...register("semesterName")}
            >
              {semester.semesterName}
            </h2>
          </div>
          <p
            className="text-gray-600 mb-4 text-sm sm:text-base"
            {...register("description")}
          >
            {semester.description}
          </p>

          {semester.yearId && (
            <div className="bg-gray-50 p-3 rounded-lg text-sm sm:text-base mb-4">
              <p className="text-[rgb(0,51,102)] font-medium">
                Year: {semester.yearId.yearName}
              </p>
              <p className="text-gray-600" {...register("yearDescription")}>
                {semester.yearId.description}
              </p>
            </div>
          )}

          <div className="space-y-2 mb-4">
            <p className="text-[rgb(0,51,102)] font-semibold">Subjects:</p>
            {semester.subjects.map((sub, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg text-sm sm:text-base"
              >
                <span className="text-gray-700">{sub.subjectName}</span>
                {sub.syllabusPdf && (
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/semester/${sub.syllabusPdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[rgb(0,51,102)] hover:underline"
                  >
                    <FiDownload /> PDF
                  </a>
                )}
              </div>
            ))}
          </div>

          {semester.yearId?.syllabusPdf && (
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/year/${semester.yearId.syllabusPdf}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[rgb(0,51,102)] text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition text-sm sm:text-base"
            >
              <FiEye /> View Semester Syllabus
            </a>
          )}
        </div>
      </div>
    </ProtectedLayout>
  );
}
