import { useState } from "react";
import { useTranslation } from "react-i18next";
import ChangeCourseFee from "./changeCourseFee/ChangeCourseFee";
import "./courses.scss";
import ListCourses from "./listCourse/ListCourse";

const Courses = () => {
  const [coursesTranslation] = useTranslation("courses");

  const [changeCourseFee, setChangeCourseFee] = useState<boolean>(false);
  const [newCourse, setNewCourse] = useState<boolean>(false);

  return (
    <div className="">
      {newCourse ? (
        <></>
      ) : changeCourseFee ? (
        <></>
      ) : (
        <div
          className="d-flex  p-3 cursor changeCourseFeeButton"
          onClick={() => {
            setChangeCourseFee(true);
          }}
        >
          {changeCourseFee ? (
            <></>
          ) : (
            coursesTranslation("courses.changeCourseFees")
          )}
        </div>
      )}
      <div>{changeCourseFee ? <ChangeCourseFee /> : <></>}</div>

      {changeCourseFee ? (
        <></>
      ) : newCourse ? (
        <></>
      ) : (
        <div
          className="d-flex p-3 cursor newCourseButton"
          onClick={() => {
            setNewCourse(true);
          }}
        >
          {newCourse ? <></> : coursesTranslation("courses.listCourse")}
        </div>
      )}
      {newCourse ? <ListCourses /> : <></>}
    </div>
  );
};

export default Courses;
