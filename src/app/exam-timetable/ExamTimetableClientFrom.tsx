"use client";

import { FiDownload, FiCalendar } from "react-icons/fi";
import moment from "moment";

/* -----------------------------
   Define Proper Type Interfaces
------------------------------ */

interface PopulatedSemester {
  _id: string;
  semesterName: string;
}

interface PopulatedYear {
  _id: string;
  yearName: string;
}

interface ExamTimetable {
  _id: string;
  examDate?: string;
  fileUrl?: string;
  semesterId?: PopulatedSemester | string;
  yearId?: PopulatedYear | string;
}

interface Course {
  _id: string;
  courseName: string;
  examTimetables?: ExamTimetable[];
}

export default function ExamTimetableClient({ course }: { course: Course }) {
  const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";

  return (
    <div className="p-6 max-w-4xl mx-auto pt-20">
      <h1 className="text-3xl font-bold text-[rgb(0,51,102)] underline mb-6">
        📅 Exam Timetables
      </h1>

      {course?.examTimetables?.length === 0 ? (
        <p className="text-gray-500">No exam timetables available.</p>
      ) : (
        <div className="space-y-4">
          {course?.examTimetables?.map((exam) => (
            <div
              key={exam._id}
              className="shiny-card relative rounded-xl p-5 flex items-center justify-between overflow-hidden transition hover:scale-[1.02]"
            >
              {/* Left Section: Icon + Info */}
              <div className="flex items-center gap-3 z-10 relative">
                <FiCalendar className="text-[rgb(0,51,102)] text-2xl" />
                <div>
                  <h2 className="text-lg font-semibold text-[rgb(0,51,102)]">
                    {/* Handle both populated and unpopulated references */}
                    {exam.semesterId && typeof exam.semesterId !== "string"
                      ? exam.semesterId.semesterName
                      : "Unknown Semester"}{" "}
                    -{" "}
                    {exam.examDate
                      ? moment(exam.examDate).format("DD MMM YYYY, hh:mm A")
                      : "Date not available"}
                  </h2>

                  <p className="text-gray-600">
                    {exam.yearId && typeof exam.yearId !== "string"
                      ? exam.yearId.yearName
                      : "Unknown Year"}
                  </p>
                </div>
              </div>

              {exam.fileUrl ? (
                <a
                  href={`${baseURL}/uploads/exam-timetable/${exam.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow-md transition hover:scale-105 z-10 relative"
                >
                  <FiDownload /> Download PDF
                </a>
              ) : (
                <p className="text-gray-400 italic text-sm">
                  No file available
                </p>
              )}

              {/* Shiny animated border effect */}
              <div className="absolute inset-0 rounded-xl border-gradient pointer-events-none"></div>
            </div>
          ))}
        </div>
      )}

      {/* Internal CSS for glow animation & buttons */}
      <style jsx>{`
        .shiny-card {
          position: relative;
          background: #ffffff;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(14, 85, 200, 0.08),
            0 2px 6px rgba(14, 85, 200, 0.05);
        }

        .border-gradient {
          padding: 3px;
          border-radius: 1rem;
          background: linear-gradient(
            135deg,
            #003399,
            #1e5a96,
            #2aa4ff,
            #003399
          );
          background-size: 300% 300%;
          animation: borderMove 6s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
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
          background-image: linear-gradient(90deg, #1e5a96 0%, #2aa4ff 100%);
          box-shadow: 0 6px 18px rgba(30, 90, 150, 0.14);
        }
      `}</style>
    </div>
  );
}
