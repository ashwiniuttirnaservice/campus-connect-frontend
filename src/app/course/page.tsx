"use client";

import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { GiGraduateCap } from "react-icons/gi";
import ProtectedLayout from "@/components/ProtectedLayout";
import Cookies from "js-cookie";
import { Course, Student, getStudentById } from "@/services/studentService";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    const fetchStudentCourses = async () => {
      const studentId = Cookies.get("studentId");
      if (!studentId) return setLoading(false);

      try {
        const student: Student = await getStudentById(studentId);

        if (Array.isArray(student.courseId)) {
          setCourses(student.courseId);
        } else if (
          typeof student.courseId === "object" &&
          student.courseId !== null
        ) {
          setCourses([student.courseId as Course]);
        }
      } catch (err) {
        console.error("Error fetching student course:", err);
        setError("Failed to load course information.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentCourses();
  }, []);

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <ProtectedLayout>
      <div className="relative min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 pt-24 pb-20 overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200">
        <div className="absolute inset-0">
          <div className="absolute w-[600px] h-[600px] bg-white/40 rounded-full blur-3xl top-[-200px] left-[-200px]" />
          <div className="absolute w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl bottom-[-150px] right-[-150px]" />
        </div>

        <h2 className="relative z-10 text-3xl font-bold mb-12 flex items-center gap-3 text-gray-800 drop-shadow-sm">
          <GiGraduateCap size={36} className="text-gray-700" />
          My Courses
          <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gray-400/50 rounded"></span>
        </h2>

        {loading ? (
          <div className="animate-pulse bg-white/50 border border-blue-300/30 shadow-xl rounded-3xl p-8 w-full max-w-md flex flex-col gap-4">
            <div className="h-6 w-1/3 bg-blue-200/40 rounded"></div>
            <div className="h-4 w-full bg-blue-200/30 rounded"></div>
            <div className="h-4 w-full bg-blue-200/30 rounded"></div>
            <div className="h-4 w-1/2 bg-blue-200/30 rounded"></div>
            <div className="h-10 w-1/2 bg-blue-300/40 rounded-full mt-4"></div>
          </div>
        ) : courses.length > 0 ? (
          <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course, index) => (
              <article
                key={index}
                className="shiny-card relative rounded-2xl p-8"
              >
                <div className="pt-0 relative z-10">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {course.category}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {course.description}
                  </p>
                  <div className="mt-4 text-gray-700 text-sm space-y-2">
                    <p>
                      <span className="font-bold text-gray-900">Duration:</span>{" "}
                      {course.duration}
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">
                        Academic Year:
                      </span>{" "}
                      {course.academicYear}
                    </p>
                  </div>
                </div>

                {course.courseSyllabusPdf && (
                  <a
                    href={`${baseURL}/uploads/syllabus/${course.courseSyllabusPdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-white shadow-md text-sm font-medium download-btn self-center z-10"
                  >
                    <FiEye size={18} />
                    View Syllabus
                  </a>
                )}

                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[rgba(30,90,150,0.12)] to-[rgba(80,150,255,0.08)] blur-xl pointer-events-none" />

                <style jsx>{`
                  .shiny-card {
                    background: linear-gradient(
                      180deg,
                      #ffffff 0%,
                      #f7fbff 100%
                    );
                    position: relative;
                    overflow: hidden;
                    border-radius: 1rem;
                    padding: 1.5rem;
                    box-shadow: 0 6px 18px rgba(14, 85, 200, 0.08),
                      0 2px 6px rgba(14, 85, 200, 0.05);
                  }

                  .shiny-card::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    padding: 3px;
                    border-radius: 1rem;
                    background: linear-gradient(
                      135deg,
                      rgb(0, 51, 150),
                      rgb(60, 150, 255),
                      rgb(0, 51, 150)
                    );
                    background-size: 300% 300%;
                    animation: borderMove 6s linear infinite;
                    -webkit-mask: linear-gradient(#fff 0 0) content-box,
                      linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                  }

                  .shiny-card::before {
                    content: "";
                    position: absolute;
                    top: -60%;
                    left: 0;
                    width: 60%;
                    height: 260%;
                    background: linear-gradient(
                      120deg,
                      rgba(255, 255, 255, 0) 0%,
                      rgba(255, 255, 255, 0.35) 50%,
                      rgba(255, 255, 255, 0) 100%
                    );
                    transform: rotate(25deg);
                    animation: shineMove 4s linear infinite;
                    pointer-events: none;
                  }

                  @keyframes shineMove {
                    0% {
                      left: -60%;
                    }
                    100% {
                      left: 160%;
                    }
                  }

                  @keyframes borderMove {
                    0% {
                      background-position: 0% 50%;
                    }
                    100% {
                      background-position: 300% 50%;
                    }
                  }

                  .download-btn {
                    background-image: linear-gradient(
                      90deg,
                      #1e5a96 0%,
                      #2aa4ff 100%
                    );
                    box-shadow: 0 6px 18px rgba(30, 90, 150, 0.14);
                  }
                `}</style>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center mt-10 text-gray-500 text-lg">
            No courses found.
          </p>
        )}
      </div>
    </ProtectedLayout>
  );
}
