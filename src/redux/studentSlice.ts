import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface Student {
  _id?: string;
  fullName: string;
  email?: string;
  mobileNo?: string;
  motherName?: string;
  prnNo: string;
  profileImage?: string;
  gender?: "Male" | "Female" | "Other";
  dob?: string;
  age?: number;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  currentAddress?: string;
  courseId?: string;
  year?: string;
  semesterId?: string;
}

interface StudentState {
  student: Student | null;
}

const initialState: StudentState = {
  student:
    typeof window !== "undefined"
      ? JSON.parse(Cookies.get("student") || "null")
      : null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    // ✅ Allow both Student and null for safety
    setStudent: (state, action: PayloadAction<Student | null>) => {
      state.student = action.payload;
      if (typeof window !== "undefined") {
        if (action.payload) {
          Cookies.set("student", JSON.stringify(action.payload), {
            expires: 7,
            secure: true,
          });
        } else {
          Cookies.remove("student");
        }
      }
    },

    // ✅ Explicit logout handler (optional, for readability)
    clearStudent: (state) => {
      state.student = null;
      if (typeof window !== "undefined") {
        Cookies.remove("student");
      }
    },
  },
});

export const { setStudent, clearStudent } = studentSlice.actions;
export default studentSlice.reducer;
