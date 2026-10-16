export interface ApiResponse<T> {
  success: boolean;
  data: T[];
}

export interface Course {
  _id: string;
  category: string;
}

export interface Year {
  _id: string;
  yearName: string;
}

export interface Semester {
  _id: string;
  semesterName: string;
}
