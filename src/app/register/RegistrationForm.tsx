"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Course, Year, Semester } from "@/types/common";

interface Props {
  courses: Course[];
  years: Year[];
  semesters: Semester[];
}

type StudentFormInputs = {
  fullName: string;
  motherName: string;
  age: number;
  currentAddress: string;
  email: string;
  mobileNo: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  prnNo: string;
  gender: string;
  dob: string;
  courseId: string;
  yearId: string;
  semesterId: string;
};

export default function StudentFormPage({ courses, years, semesters }: Props) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormInputs>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async (values: StudentFormInputs) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value as string)
      );
      if (file) formData.append("profileImage", file);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/students`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(data.message);
      if (data.success) {
        reset();
        setFile(null);
        setPreview(null);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Something went wrong!");
      } else {
        alert("Unexpected error occurred!");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg- backdrop-blur-md shadow-xl rounded-2xl p-8 w-full border-blue-900 max-w-6xl border-2 mt-10">
        <h2 className="text-3xl font-bold text-center text-[rgb(0,51,102)] mb-8 drop-shadow">
          🎓 Student Registration Form
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* LEFT COLUMN: Profile + Personal Info */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[rgb(0,51,102)] shadow-lg relative">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile Preview"
                  width={144}
                  height={144}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                  Upload Photo
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-gray-700"
            />

            <div className="w-full space-y-3">
              <h3 className="text-lg font-semibold text-white bg-[rgb(0,51,102)] px-3 py-2 rounded-md">
                Personal Info
              </h3>

              {[
                { name: "fullName", label: "Full Name" },
                { name: "motherName", label: "Mother's Name" },
                { name: "age", label: "Age", type: "number" },
                { name: "currentAddress", label: "Current Address" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold mb-1">
                    {field.label} *
                  </label>
                  <input
                    type={field.type || "text"}
                    {...register(field.name as keyof StudentFormInputs, {
                      required: `${field.label} is required`,
                    })}
                    placeholder={field.label}
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[rgb(0,51,102)] bg-white/70"
                  />
                  {errors[field.name as keyof StudentFormInputs] && (
                    <p className="text-red-500 text-sm">
                      {
                        errors[field.name as keyof StudentFormInputs]
                          ?.message as string
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Contact + Education Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <h3 className="col-span-2 text-lg font-semibold text-white bg-[rgb(0,51,102)] px-3 py-2 rounded-md">
                Contact Info
              </h3>

              {[
                { name: "email", label: "Email", type: "email" },
                { name: "mobileNo", label: "Mobile No" },
                { name: "address", label: "Permanent Address" },
                { name: "city", label: "City" },
                { name: "state", label: "State" },
                { name: "pincode", label: "Pincode" },
              ].map((field) => (
                <div
                  key={field.name}
                  className={
                    ["address"].includes(field.name) ? "sm:col-span-2" : ""
                  }
                >
                  <label className="block text-sm font-semibold mb-1">
                    {field.label} *
                  </label>
                  <input
                    type={field.type || "text"}
                    {...register(field.name as keyof StudentFormInputs, {
                      required: `${field.label} is required`,
                    })}
                    placeholder={field.label}
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[rgb(0,51,102)] bg-white/70"
                  />
                  {errors[field.name as keyof StudentFormInputs] && (
                    <p className="text-red-500 text-sm">
                      {
                        errors[field.name as keyof StudentFormInputs]
                          ?.message as string
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Education Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <h3 className="col-span-2 text-lg font-semibold text-white bg-[rgb(0,51,102)] px-3 py-2 rounded-md">
                Education Info
              </h3>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  PRN Number *
                </label>
                <input
                  type="text"
                  {...register("prnNo", { required: "PRN Number is required" })}
                  placeholder="PRN Number"
                  className="w-full border rounded-md px-3 py-2 focus:ring-[rgb(0,51,102)] bg-white/70"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Gender *
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="w-full border rounded-md px-3 py-2 bg-white/70 focus:ring-2 focus:ring-[rgb(0,51,102)]"
                >
                  <option value="">-- Select Gender --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  {...register("dob", {
                    required: "Date of Birth is required",
                  })}
                  className="w-full border rounded-md px-3 py-2 bg-white/70 focus:ring-2 focus:ring-[rgb(0,51,102)]"
                />
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Course *
                </label>
                <select
                  {...register("courseId", { required: "Course is required" })}
                  className="w-full border rounded-md px-3 py-2 bg-white/70 focus:ring-2 focus:ring-[rgb(0,51,102)]"
                >
                  <option value="">-- Select Course --</option>
                  {courses.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Year *
                </label>
                <select
                  {...register("yearId", { required: "Year is required" })}
                  className="w-full border rounded-md px-3 py-2 bg-white/70 focus:ring-2 focus:ring-[rgb(0,51,102)]"
                >
                  <option value="">-- Select Year --</option>
                  {years.map((y) => (
                    <option key={y._id} value={y._id}>
                      {y.yearName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Semester *
                </label>
                <select
                  {...register("semesterId", {
                    required: "Semester is required",
                  })}
                  className="w-full border rounded-md px-3 py-2 bg-white/70 focus:ring-2 focus:ring-[rgb(0,51,102)]"
                >
                  <option value="">-- Select Semester --</option>
                  {semesters.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.semesterName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-span-full flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="mt-6 px-10 py-3 bg-[rgb(0,51,102)] text-white rounded-full font-semibold hover:bg-[rgb(0,80,150)] transition-all duration-300 shadow-lg hover:scale-105"
            >
              {loading ? "Submitting..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
