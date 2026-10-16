"use client";

import { ReactNode, useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, RootState } from "@/redux/store";
import { setStudent, Student } from "@/redux/studentSlice";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Cookies from "js-cookie";

interface ClientLayoutProps {
  children: ReactNode;
  initialStudent?: Student | null;
}

function InnerLayout({
  children,
  initialStudent,
}: {
  children: ReactNode;
  initialStudent?: Student | null;
}) {
  const dispatch = useDispatch();
  const student = useSelector((state: RootState) => state.student.student);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  useEffect(() => {
    // Load student from SSR or cookies
    if (initialStudent) {
      dispatch(setStudent(initialStudent));
    } else {
      const cookieStudent = Cookies.get("student");
      if (cookieStudent) {
        dispatch(setStudent(JSON.parse(cookieStudent)));
      }
    }
  }, [initialStudent, dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {student && (
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      )}

      <div className="flex-1 flex flex-col transition-all duration-300">
        <Navbar />
        <main
          className={`flex-1 transition-all duration-300 ${
            student
              ? sidebarCollapsed
                ? "lg:ml-20 ml-0"
                : "lg:ml-64 ml-0"
              : "ml-0"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default function ClientLayout({
  children,
  initialStudent,
}: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  return (
    <Provider store={store}>
      <InnerLayout initialStudent={initialStudent}>{children}</InnerLayout>
    </Provider>
  );
}
