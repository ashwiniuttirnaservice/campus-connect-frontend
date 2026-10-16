"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const student = useSelector((state: RootState) => state.student.student);
  const router = useRouter();

  useEffect(() => {
    if (!student) {
      router.push("/login");
    }
  }, [student, router]);

  if (!student) return null;
  return <>{children}</>;
}
