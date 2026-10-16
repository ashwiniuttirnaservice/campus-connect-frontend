// services/studentService.ts
import api from "./api";

export interface Course {
  _id: string;
  category: string;
  description: string;
  duration: string;
  academicYear: string;
  courseSyllabusPdf?: string;
}

export interface Year {
  _id: string;
  yearName: string;
  description: string;
  syllabusPdf?: string;
  courseId?: Course;
}

export interface Semester {
  _id: string;
  semesterName: string;
  description: string;
}

export interface Student {
  _id: string;
  fullName: string;
  email: string;
  mobileNo: string;
  motherName?: string;
  prnNo?: string;
  profileImage?: string;
  gender?: string;
  dob?: string;
  age?: number;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  currentAddress?: string;
  courseId: Course;
  yearId: Year;
  semesterId: Semester;
}

export const getStudentById = async (studentId: string): Promise<Student> => {
  const res = await api.get(`/students/${studentId}`);
  return res.data.data;
};
