"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import type { RootState } from "@/redux/store";
import { clearStudent } from "@/redux/studentSlice";

interface Student {
  _id: string;
  fullName: string;
  profileImage?: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const student = useSelector(
    (state: RootState) => state.student.student
  ) as Student | null;
  const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const handleLogout = (): void => {
    dispatch(clearStudent());
    Cookies.remove("student");
    router.push("/login");
  };

  const linkClass =
    "px-5 py-2 rounded-full font-medium transition hover:scale-105";
  const activeClass = "bg-cyan-600 text-white shadow-md";
  const normalClass = "hover:bg-cyan-600";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#002244] via-[#003366] to-[#004488] text-white shadow-md shadow-blue-900/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3 select-none cursor-default group">
          <Image
            src="/logo.png"
            alt="CampusConnect Logo"
            width={48}
            height={48}
            className="rounded-full border-2 border-transparent group-hover:border-cyan-300 transition"
          />
          <span className="text-2xl font-bold tracking-wide group-hover:text-cyan-200 transition">
            CampusConnect
          </span>
        </div>

        {!student ? (
          <ul className="hidden md:flex gap-6 items-center">
            {pathname !== "/login" && (
              <li>
                <Link
                  href="/login"
                  className={`${linkClass} ${
                    pathname === "/register" ? activeClass : normalClass
                  }`}
                >
                  Login
                </Link>
              </li>
            )}
            {pathname !== "/register" && (
              <li>
                <Link
                  href="/register"
                  className={`${linkClass} ${
                    pathname === "/login" ? activeClass : normalClass
                  }`}
                >
                  Register
                </Link>
              </li>
            )}
          </ul>
        ) : (
          <div className="hidden md:flex items-center gap-5 relative">
            <span className="font-semibold">Welcome, {student.fullName}</span>

            <div className="relative">
              <button
                aria-label="Toggle profile menu"
                className="focus:outline-none"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <Image
                  src={
                    student.profileImage
                      ? `${baseURL}/uploads/student/profile/${student.profileImage}`
                      : "/default-avatar.png"
                  }
                  alt={student.fullName || "Profile"}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white hover:scale-105 transition"
                />
              </button>

              <div
                className={`absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-lg shadow-lg divide-y divide-gray-200 z-50 transform transition-all duration-300
                ${
                  dropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="p-3 border-cyan-600 text-center">
                  <p className="font-bold">{student.fullName}</p>
                </div>
                <div className="p-2 space-y-1">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 rounded-md hover:bg-cyan-600 hover:text-white transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/notifications"
                    className="block px-4 py-2 rounded-md hover:bg-cyan-600 hover:text-white transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Notifications
                  </Link>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          aria-label="Toggle menu"
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-gradient-to-r from-[#002244] via-[#003366] to-[#004488] border-t border-cyan-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 space-y-2">
          {!student ? (
            <>
              {pathname !== "/login" && (
                <Link
                  href="/login"
                  className={`${linkClass} block ${
                    pathname === "/register" ? activeClass : normalClass
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
              {pathname !== "/register" && (
                <Link
                  href="/register"
                  className={`${linkClass} block ${
                    pathname === "/login" ? activeClass : normalClass
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              )}
            </>
          ) : (
            <>
              <span className="block px-4 py-2 font-semibold">
                Welcome, {student.fullName}
              </span>
              <Link
                href="/profile"
                className="block hover:bg-cyan-600 px-4 py-2 rounded-md font-medium transition"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/notifications"
                className="block hover:bg-cyan-600 px-4 py-2 rounded-md font-medium transition"
                onClick={() => setIsOpen(false)}
              >
                Notifications
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full font-medium transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
