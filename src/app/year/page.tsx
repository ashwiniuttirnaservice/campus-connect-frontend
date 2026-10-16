"use client";

import { useEffect, useState } from "react";
import {
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiEye,
  FiX,
} from "react-icons/fi";
import { GiGraduateCap } from "react-icons/gi";
import ProtectedLayout from "@/components/ProtectedLayout";
import {
  getCourseById,
  Course,
  Semester,
  Subject,
  Unit,
  Year,
} from "@/services/courseService";
import Cookies from "js-cookie";

export default function YearSemesterPage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSemester, setShowSemester] = useState(false);
  const [visibleSemesterId, setVisibleSemesterId] = useState<string | null>(
    null
  );
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [openUnits, setOpenUnits] = useState<string[]>([]);

  const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseId = Cookies.get("courseId");
        if (!courseId) {
          setError("Course ID not found.");
          setLoading(false);
          return;
        }
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, []);

  const toggleUnit = (unitId: string) => {
    setOpenUnits((prev) =>
      prev.includes(unitId)
        ? prev.filter((id) => id !== unitId)
        : [...prev, unitId]
    );
  };

  if (loading)
    return (
      <ProtectedLayout>
        <div className="p-6 text-center">Loading course details...</div>
      </ProtectedLayout>
    );

  if (error)
    return (
      <ProtectedLayout>
        <div className="p-6 text-center text-red-500">{error}</div>
      </ProtectedLayout>
    );

  if (!course)
    return (
      <ProtectedLayout>
        <div className="p-6 text-center text-gray-500">
          No course data found.
        </div>
      </ProtectedLayout>
    );

  const years: Year[] = course.yearId || [];

  return (
    <ProtectedLayout>
      <div className="relative min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 pt-24 pb-20 overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200">
        <h2 className="relative z-10 text-3xl font-bold mb-12 flex items-center gap-3 text-blue-900 drop-shadow-sm">
          <GiGraduateCap size={36} className="text-blue-800" />
          My Academic Year
          <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-blue-400/40 rounded"></span>
        </h2>

        <div
          className={`flex flex-col sm:flex-row flex-wrap gap-6 mb-10 ${
            years.length === 1 ? "justify-center" : "justify-between"
          }`}
        >
          {years.map((year) => (
            <div
              key={year._id}
              className="relative shiny-card rounded-2xl p-6 shadow-lg transition-transform duration-300 hover:scale-[1.03] w-full sm:w-[420px]"
            >
              <div className="flex flex-col items-center gap-3 mb-4 z-10 relative">
                <FiCalendar className="text-blue-700 text-3xl" />
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
                  {year.yearName}
                </h3>
              </div>

              {year.description && (
                <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed z-10 relative">
                  {year.description}
                </p>
              )}

              <div className="flex flex-row gap-6 mt-4">
                {/* Toggle Semesters Button */}
                <button
                  onClick={() => {
                    setShowSemester(!showSemester);
                    setVisibleSemesterId(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1.5 rounded-xl hover:scale-105 transition-transform duration-200"
                >
                  {showSemester ? <FiChevronUp /> : <FiChevronDown />}
                  <span className="text-sm sm:text-base font-medium">
                    {showSemester ? "Hide Semesters" : "View Semesters"}
                  </span>
                </button>

                {year.syllabusPdf && (
                  <a
                    href={`${baseURL}/uploads/years/${year.syllabusPdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 text-blue-700 border border-blue-300/50 px-4 py-1.5 rounded-xl hover:bg-white/20 transition"
                  >
                    <FiEye className="text-lg" />
                    <span className="text-sm sm:text-base font-medium">
                      View Syllabus
                    </span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Semester Section */}
        {showSemester && years[0] && (
          <>
            {(() => {
              const year = years[0];
              const semesters: Semester[] = year?.semesterId || [];

              return (
                <div
                  className={`grid gap-8 transition-all duration-300 ${
                    visibleSemesterId
                      ? "grid-cols-1"
                      : "grid-cols-1 md:grid-cols-2"
                  }`}
                >
                  {semesters.map((sem) => (
                    <div
                      key={sem._id}
                      className={`${
                        visibleSemesterId && visibleSemesterId !== sem._id
                          ? "hidden"
                          : "block"
                      }`}
                    >
                      <div className="relative shiny-card rounded-2xl shadow-lg p-8">
                        <div className="flex items-center justify-between mb-4 z-10 relative">
                          <h2 className="text-2xl font-bold text-blue-900">
                            {sem.semesterName}
                          </h2>
                          <FiCalendar className="text-blue-600 text-xl" />
                        </div>

                        <p className="text-gray-700 text-base mb-6 z-10 relative">
                          {sem.description}
                        </p>

                        <button
                          onClick={() =>
                            setVisibleSemesterId(
                              visibleSemesterId === sem._id ? null : sem._id
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200"
                        >
                          <FiEye />
                          <span className="text-sm sm:text-base font-medium">
                            {visibleSemesterId === sem._id
                              ? "Hide Syllabus"
                              : "View Syllabus"}
                          </span>
                        </button>
                      </div>

                      {/* ✅ Subjects inside semester */}
                      {visibleSemesterId === sem._id && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                          {sem.syllabusId?.subjects?.map((sub) => (
                            <div
                              key={sub._id}
                              className="relative shiny-card text-gray-900 rounded-xl shadow-md p-6 hover:scale-[1.03] transition-transform duration-200 overflow-hidden"
                            >
                              <div className="z-10 relative">
                                <h2 className="text-xl font-bold mb-2 text-blue-900">
                                  {sub.subjectName}
                                </h2>
                                <p className="text-gray-600 text-base">
                                  Units: {sub.units?.length || 0}
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedSubject(sub);
                                  setOpenUnits([]);
                                }}
                                className="mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-full hover:scale-105 transition-transform duration-200"
                              >
                                <FiEye />
                                <span className="text-sm sm:text-base font-medium">
                                  View Details
                                </span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
          </>
        )}

        {/* ✅ Subject Modal */}
        {selectedSubject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-20 z-50 overflow-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-8 sm:p-10 relative animate-fadeIn modal-glow">
              <button
                onClick={() => setSelectedSubject(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <FiX size={28} />
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 text-center">
                {selectedSubject.subjectName}
              </h2>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {selectedSubject.units?.map((unit: Unit) => {
                  const isOpen = openUnits.includes(unit._id);
                  return (
                    <div
                      key={unit._id}
                      className="border border-blue-200 rounded-xl shadow-sm"
                    >
                      <div
                        className="flex justify-between items-center p-4 bg-blue-50 rounded-t-xl cursor-pointer hover:bg-blue-100"
                        onClick={() => toggleUnit(unit._id)}
                      >
                        <h3 className="font-semibold text-blue-800">
                          {unit.title}
                        </h3>
                        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                      </div>
                      {isOpen && (
                        <ul className="list-disc pl-6 pr-4 py-3 text-gray-700 space-y-1 text-sm sm:text-base bg-white rounded-b-xl">
                          {unit.chapters.map((ch, idx) => (
                            <li key={idx}>{ch}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ✨ Shared shiny & modal styles */}
        <style jsx>{`
          .shiny-card {
            position: relative;
            background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
            border-radius: 1rem;
            overflow: hidden;
            border: 1px solid rgba(14, 85, 200, 0.15);
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

          @keyframes borderMove {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 300% 50%;
            }
          }

          .modal-glow {
            border: 2px solid rgba(14, 85, 200, 0.3);
            box-shadow: 0 0 20px rgba(14, 85, 200, 0.2),
              0 0 40px rgba(14, 85, 200, 0.1);
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </ProtectedLayout>
  );
}
