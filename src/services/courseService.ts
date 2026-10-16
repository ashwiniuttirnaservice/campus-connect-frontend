import api from "./api";

export interface Reference<T = unknown> {
  _id: string;
  data?: T;
}

export interface Unit {
  _id: string;
  title: string;
  chapters: string[];
}

export interface Subject {
  _id: string;
  subjectName: string;
  units: Unit[];
}

export interface Syllabus {
  _id: string;
  semesterId: string;
  yearId: string;
  courseId: string;
  subjects: Subject[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Semester {
  _id: string;
  semesterName: string;
  description?: string;
  syllabusId: Syllabus;
  courseId: string;
  yearId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// 🧑‍🎓 Year details
export interface Year {
  _id: string;
  yearName: string;
  description?: string;
  syllabusPdf?: string;
  courseId: string;
  semesterId: Semester[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface QuestionPaper {
  _id: string;
  subject: string;
  examType: string;
  academicYear: string;
  files: string[];
  createdAt: string;
  updatedAt: string;
  courseId: string;
  yearId?: Reference | null;
  semesterId?: Reference | null;
  __v?: number;
}

export interface ExamTimetable {
  _id: string;
  examDate: string;
  fileUrl: string;
  createdAt: string;
  updatedAt?: string;
  courseId?: string;
  yearId?: Reference | null;
  semesterId?: Reference | null;
  __v?: number;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  courseId: string;
  semesterId?: Reference | null;
  yearId?: Reference | null;
  startDateTime?: string;
  endDateTime?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Course {
  _id: string;
  courseName: string;
  category: string;
  description?: string;
  duration?: string;
  academicYear?: string;
  courseSyllabusPdf?: string;
  createdAt: string;
  updatedAt: string;
  yearId: Year[];
  notifications?: Notification[];
  questionPapers?: QuestionPaper[];
  examTimetables?: ExamTimetable[];
  __v?: number;
}

export const getCourseById = async (courseId: string): Promise<Course> => {
  const res = await api.get(`/courses/${courseId}`);
  if (!res.data.data) throw new Error("Course not found");
  return res.data.data as Course;
};
