export interface Course {
  category: string;
  duration: string;
}

export interface Year {
  yearName: string;
}

export interface Semester {
  semesterName: string;
}

export interface Student {
  _id: string;
  fullName: string;
  profileImage?: string;
  motherName?: string;
  currentAddress?: string;
  email?: string;
  mobileNo?: string;
  courseId?: Course;
  yearId?: Year;
  semesterId?: Semester;
}
