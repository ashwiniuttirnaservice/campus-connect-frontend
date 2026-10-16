"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AppLayout({ children }: { children: ReactNode }) {
  const student = useSelector((state: RootState) => state.student.student);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {student && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}
      <main
        className={`flex-1 transition-all duration-300 ${
          student ? (collapsed ? "" : "") : "ml-0"
        }`}
      >
        <Navbar />
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
