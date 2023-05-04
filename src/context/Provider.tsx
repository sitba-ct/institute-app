import { ReactNode, useState } from "react";
import Course from "../services/course/Course";
import Group from "../services/group/Group";
import { CourseContext } from "./CourseContextProvider";
import { GroupContext } from "./GroupContextProvider";

interface props {
  children: ReactNode;
}

export function Provider({ children }: props) {
  const [course, setCourse] = useState(new Course());
  const [group, setGroup] = useState(new Group());

  return (
      <CourseContext.Provider value={{ course, setCourse }}>
        <GroupContext.Provider value={{ group, setGroup }}>
          {children}
        </GroupContext.Provider>
      </CourseContext.Provider>
  );
}
