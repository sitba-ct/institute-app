import ICourse from "../services/course/ICourse";
import { createContext } from "react";

type CourseContextType = {
  course: ICourse;
  setCourse: (value: ICourse) => void;
};

export const CourseContext = createContext<CourseContextType>(undefined!);
