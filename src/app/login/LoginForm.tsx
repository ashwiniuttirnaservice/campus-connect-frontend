"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/services/api";
import { useDispatch } from "react-redux";
import { setStudent } from "@/redux/studentSlice";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

interface LoginValues {
  prnNo: string;
  motherName: string;
}

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    prnNo: Yup.string().required("PRN Number is required"),
    motherName: Yup.string().required("Mother&apos;s Name is required"), // fixed apostrophe
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const response = await api.post("/student-login", values);
      if (response.data?.success) {
        const studentData = response.data.data.student;
        dispatch(setStudent(studentData));
        Cookies.set("student", JSON.stringify(studentData), { expires: 7 });
        Cookies.set("studentId", studentData._id, { expires: 7 });
        Cookies.set("courseId", studentData.courseId, { expires: 7 });
        Cookies.set("semesterId", studentData.semesterId, { expires: 7 });
        router.push("/profile");
      }
    } catch (err: unknown) {
      let message = "Invalid PRN Number or Mother&apos;s Name"; // fixed apostrophe
      if (err instanceof AxiosError && err.response?.data?.message) {
        message = err.response.data.message;
      }
      setError("prnNo", { type: "manual", message });
    }
  };

  return (
    <div
      className="min-h-screen w-full mt-6 flex flex-col justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images.jpeg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="University Logo"
          width={112}
          height={112}
          className="w-28 h-28 mb-4 rounded-full bg-white/20 backdrop-blur-md p-2 shadow-lg"
        />

        {/* University Name */}
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white text-4xl md:text-5xl font-extrabold mb-6 text-center drop-shadow-lg">
          SAVITRIBAI PHULE PUNE UNIVERSITY
        </h1>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-8 md:p-10 shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-white border-b-4 border-blue-400 inline-block">
            Student Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* PRN Number */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-100">
                PRN Number *
              </label>
              <input
                type="text"
                placeholder="Enter PRN Number"
                {...register("prnNo")}
                className="w-full border border-white/40 bg-transparent text-gray-100 placeholder-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              {errors.prnNo && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.prnNo.message}
                </p>
              )}
            </div>

            {/* Mother's Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-1 text-gray-100">
                Mother&apos;s Name *
              </label>
              <input
                type="text"
                placeholder="Enter Mother's Name"
                {...register("motherName")}
                className="w-full border border-white/40 bg-transparent text-gray-100 placeholder-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              {errors.motherName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.motherName.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 rounded-full font-semibold hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
