"use client";

import ProtectedLayout from "@/components/ProtectedLayout";
import { FiEye } from "react-icons/fi";
import { Course, QuestionPaper } from "@/services/courseService";

interface Props {
  course?: Course | null;
}

interface SemesterType {
  semesterName: string;
}

interface YearType {
  yearName: string;
}

export default function QuestionPapersClient({ course }: Props) {
  const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";

  if (!course || !course.questionPapers || course.questionPapers.length === 0) {
    return (
      <ProtectedLayout>
        <div className="min-h-screen bg-white p-8 pt-20">
          <h2 className="text-2xl font-bold text-center mb-6 border-b-4 border-[rgb(0,51,150)] inline-block">
            📚 Previous Year Question Papers
          </h2>
          <p className="text-center text-gray-500 text-lg">
            No Question Papers available.
          </p>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-white p-8 pt-20">
        <h2 className="text-2xl font-bold text-center mb-8 border-b-4 border-[rgb(0,51,150)] inline-block">
          📚 Previous Year Question Papers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.questionPapers.map((paper: QuestionPaper) => {
            const semester =
              paper.semesterId &&
              typeof paper.semesterId === "object" &&
              "semesterName" in paper.semesterId
                ? (paper.semesterId as unknown as SemesterType)
                : null;

            const year =
              paper.yearId &&
              typeof paper.yearId === "object" &&
              "yearName" in paper.yearId
                ? (paper.yearId as unknown as YearType)
                : null;

            const semesterName = semester?.semesterName ?? "Unknown Semester";
            const yearName = year?.yearName ?? "Unknown Year";

            return (
              <article
                key={paper._id}
                className="shiny-card relative rounded-2xl p-6 border overflow-hidden"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {paper.subject ?? "Untitled Paper"}
                  </h3>

                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-bold">Exam Type:</span>{" "}
                    {paper.examType ?? "N/A"}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-bold">Academic Year:</span>{" "}
                    {paper.academicYear ?? "N/A"}
                  </p>

                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-bold">Semester:</span>{" "}
                    {semesterName && yearName
                      ? `${semesterName} - ${yearName}`
                      : semesterName || yearName || "N/A"}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-3 z-10">
                  {paper.files && paper.files.length > 0 ? (
                    paper.files.map((file, idx) => (
                      <a
                        key={idx}
                        href={`${baseURL}/uploads/subject/${file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-btn inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-2xl text-white shadow-md text-sm font-medium"
                      >
                        <FiEye className="text-base" />
                        View File
                      </a>
                    ))
                  ) : (
                    <p className="text-gray-400 italic text-sm text-center">
                      No files available
                    </p>
                  )}
                </div>

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
            );
          })}
        </div>
      </div>
    </ProtectedLayout>
  );
}
