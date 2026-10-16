"use client";
import { useState, useEffect } from "react";
import { FiDownload, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Chapter {
  _id: string;
  title: string;
  chapters: string[];
}

interface Subject {
  _id: string;
  subjectName: string;
  units: Chapter[];
}

interface Syllabus {
  _id: string;
  subjects: Subject[];
  syllabusPdf?: {
    fileName: string;
    fileUrl: string;
  };
}

interface Props {
  syllabus: Syllabus | null;
}

export default function SyllabusClient({ syllabus }: Props) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [openUnits, setOpenUnits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL;

  // Simulate loading if data is null (for skeleton)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto pt-20 animate-pulse">
        <div className="h-10 w-1/3 bg-gray-300 rounded mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 h-32 sm:h-40"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (!syllabus)
    return <p className="p-6 text-gray-500 text-center">No syllabus found.</p>;

  const toggleUnit = (unitId: string) => {
    setOpenUnits((prev) =>
      prev.includes(unitId)
        ? prev.filter((id) => id !== unitId)
        : [...prev, unitId]
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto pt-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold border-b-4 border-[rgb(0,51,150)] inline-block">
          📘 Syllabus
        </h2>
        {syllabus.syllabusPdf && (
          <a
            href={`${baseURL}${syllabus.syllabusPdf.fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[rgb(0,51,102)] text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-cyan-700 transition truncate max-w-full sm:max-w-[250px]"
          >
            <FiDownload size={18} />
            <span className="truncate">{syllabus.syllabusPdf.fileName}</span>
          </a>
        )}
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {syllabus.subjects.map((subject) => (
          <div
            key={subject._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition transform"
            onClick={() => {
              setSelectedSubject(subject);
              setOpenUnits([]);
            }}
          >
            <h2 className="text-xl sm:text-xl font-bold text-[rgb(0,51,102)] truncate mb-2">
              {subject.subjectName}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Units: {subject.units.length}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-20 z-50 overflow-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-8 sm:p-12 relative animate-fadeIn">
            <button
              onClick={() => setSelectedSubject(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <FiX size={28} />
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(0,51,102)] mb-6 truncate">
              {selectedSubject.subjectName}
            </h2>

            {/* Units Accordion */}
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {selectedSubject.units.map((unit) => {
                const isOpen = openUnits.includes(unit._id);
                return (
                  <div
                    key={unit._id}
                    className="border border-gray-200 rounded-xl shadow-sm"
                  >
                    <div
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-t-xl cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleUnit(unit._id)}
                    >
                      <h3 className="font-semibold text-gray-700">
                        {unit.title}
                      </h3>
                      {isOpen ? (
                        <FiChevronUp size={20} />
                      ) : (
                        <FiChevronDown size={20} />
                      )}
                    </div>
                    {isOpen && (
                      <ul className="list-disc pl-6 pr-4 py-3 text-gray-600 space-y-1 text-sm sm:text-base bg-white rounded-b-xl">
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

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-in-out;
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
  );
}
