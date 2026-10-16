"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setStudent } from "@/redux/studentSlice";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import {
  MdMenuBook,
  MdCalendarToday,
  MdFilePresent,
  MdSchedule,
  MdNotifications,
  MdClose,
  MdMenu,
} from "react-icons/md";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const dispatch = useDispatch();
  const student = useSelector((state: RootState) => state.student.student);
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!student) {
      const cookieStudent = Cookies.get("student");
      if (cookieStudent) {
        dispatch(setStudent(JSON.parse(cookieStudent)));
      }
    }
    setMounted(true);
  }, [dispatch, student]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (!mounted || !student) return null;

  const menuItems = [
    { name: "Course", href: "/course", icon: <MdMenuBook /> },
    { name: "Syllabus Year", href: "/year", icon: <MdCalendarToday /> },
    {
      name: "Notifications",
      href: "/notifications",
      icon: <MdNotifications />,
    },
    {
      name: "Previous Papers",
      href: "/question-papers",
      icon: <MdFilePresent />,
    },
    { name: "Timetable", href: "/exam-timetable", icon: <MdSchedule /> },
  ];

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        className="fixed top-20 left-4 z-50 p-2 bg-cyan-700 text-white rounded-full shadow-lg hover:bg-cyan-600 transition lg:hidden"
        onClick={() => setIsMobileOpen(true)}
      >
        <MdMenu size={26} />
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      <aside
        className={`bg-gradient-to-r from-[#002244] via-[#003366] to-[#004488] text-white fixed top-16 left-0 h-[calc(100vh-4rem)] pt-4 shadow-lg flex flex-col overflow-y-auto transition-all duration-300 z-50 
          ${collapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        {/* Collapse Button (Desktop) */}
        <div className="hidden lg:flex justify-end px-2 mb-4">
          <button
            className="text-white hover:text-cyan-400 transition"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MdMenu size={24} /> : <MdClose size={24} />}
          </button>
        </div>

        {/* Close Button (Mobile) */}
        <div className="flex justify-end px-4 mb-4 lg:hidden">
          <button
            className="text-white hover:text-cyan-400 transition"
            onClick={() => setIsMobileOpen(false)}
          >
            <MdClose size={28} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-cyan-700 text-white shadow-md scale-105"
                      : "hover:bg-cyan-600 hover:scale-105 text-gray-200"
                  }`}
                title={collapsed ? item.name : ""}
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="transition-opacity duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
