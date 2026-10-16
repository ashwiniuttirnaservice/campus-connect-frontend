"use client";

import { useEffect, useState } from "react";
import { BookOpen, Camera, User, Edit3 } from "lucide-react";
import Cookies from "js-cookie";
import { getStudentById } from "@/services/studentService";
import ProtectedLayout from "@/components/ProtectedLayout";
import Year from "@/app/year/page";
import Image from "next/image";

interface Student {
  _id: string;
  fullName: string;
  profileImage?: string;
  motherName?: string;
  currentAddress?: string;
  email?: string;
  mobileNo?: string;
  courseId?: { category: string; duration: string };
  yearId?: { yearName: string };
  semesterId?: { semesterName: string };
}

export default function HomePage() {
  const [student, setStudent] = useState<Student | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    const studentId = Cookies.get("studentId");
    if (studentId) {
      getStudentById(studentId)
        .then((data) => setStudent(data))
        .catch((err) => console.error(err));
    }
  }, []);

  if (!student) {
    return (
      <ProtectedLayout>
        <p className="text-center text-gray-500 mt-10">
          Loading student details...
        </p>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="min-h-screen  mt-6 bg-gradient-to-b from-blue-50 via-white to-gray-100 flex flex-col items-center pt-16 mx-4">
        {/* ========================= */}
        {/* 🔹 Cover / Hero Section */}
        {/* ========================= */}
        <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl">
          {/* 🔹 Blurred Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{
              backgroundImage: `url('premium_photo-1670271544153-dd9933f0f119.jpeg')`,
            }}
          ></div>

          <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl"></div>

          <button className="absolute top-4 right-4 bg-white/90 text-gray-800 text-sm px-4 py-2 rounded-xl shadow-md hover:bg-white transition-all flex items-center gap-2 font-medium z-20">
            <Edit3 size={16} /> Edit Profile
          </button>

          <div className="absolute mt-15 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row gap-6 w-full max-w-6xl px-4 sm:px-8 justify-center z-20">
            {/* ✅ Personal Info Card (always visible) */}
            <div className="flex-1 bg-white/80 hover:scale-105 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all">
              <h2 className="flex items-center gap-2 font-semibold font-serif underline text-lg mb-3 text-gray-800">
                <User size={22} className="text-blue-600 " /> Personal Info
              </h2>
              <div className="space-y-1 text-sm sm:text-base text-gray-700">
                <p>
                  <span className="font-bold">Mother Name:</span>{" "}
                  {student.motherName ?? "N/A"}
                </p>
                <p>
                  <span className="font-bold">Address:</span>{" "}
                  {student.currentAddress ?? "N/A"}
                </p>
                <p>
                  <span className="font-bold">Email:</span>{" "}
                  {student.email ?? "N/A"}
                </p>
                <p>
                  <span className="font-bold">Mobile No:</span>{" "}
                  {student.mobileNo ?? "N/A"}
                </p>
              </div>
            </div>

            {/* ✅ Educational Info Card (hidden on mobile, visible on desktop) */}
            <div className="flex-1 hidden md:block bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-5 hover:shadow-2xl hover:scale-105 transition-all">
              <h2 className="flex items-center gap-2 font-semibold font-serif underline text-lg mb-3 text-gray-800">
                <BookOpen size={22} className="text-blue-600" /> Educational
                Details
              </h2>
              <div className="space-y-1 text-sm sm:text-base text-gray-700">
                <p>
                  <span className="font-bold">Course:</span>{" "}
                  {student.courseId?.category ?? "N/A"}
                </p>
                <p>
                  <span className="font-bold">Duration:</span>{" "}
                  {student.courseId?.duration ?? "N/A"}
                </p>
                <p>
                  <span className="font-bold">Year:</span>{" "}
                  {student.yearId?.yearName ?? "N/A"}
                </p>
                <p>
                  <span className="font-bold">Semester:</span>{" "}
                  {student.semesterId?.semesterName ?? "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 -mt-10 sm:mt-32 md:-mt-28 flex flex-col items-center text-center">
          <div className="relative w-40 h-40  sm:w-56 sm:h-56 md:w-52 md:h-52 rounded-full overflow-hidden shadow-2xl border-4 border-white bg-white hover:scale-105 transition-transform duration-300">
            <Image
              src={
                student.profileImage
                  ? `${baseURL}/uploads/student/profile/${student.profileImage}`
                  : "/default-avatar.png"
              }
              alt={student.fullName}
              width={200}
              height={200}
              className="object-cover rounded-full"
            />
          </div>
        </div>

        <div className=" px-4 sm:px-8 md:px-6 w-full max-w-8xl">
          <div className="bg-gradient-to-b from-white via-blue-50 to-blue-100 rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 max-w-full">
            <div className="">
              <Year />
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
