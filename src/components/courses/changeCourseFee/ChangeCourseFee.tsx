import { useEffect, useState } from "react";
import { CoursesAndPeriodsService } from "../../../services/course/coursesAndPeriods/CoursesAndPeriodsService";
import ICourseAndPeriods from "../../../services/course/coursesAndPeriods/ICourseAndPeriods";
import { container } from "tsyringe";
import { CourseService } from "../../../services/course/CourseService";
import ICourse from "../../../services/course/ICourse";
import ICoursePeriods from "../../../services/course/periods/ICoursePeriods";
import EditFeeCourseModal from "./editFeeCourseModal/EditFeeCourseModal";
import "./changeCourseFee.scss";
import { useTranslation } from "react-i18next";
import getSessionFromStorage from "../../../services/auth/SessionService";

const ChangeCourseFee = () => {
  const [coursesTranslation] = useTranslation("courses");

  const courseService = container.resolve(CourseService);
  const coursesAndPeriodsService = container.resolve(CoursesAndPeriodsService);

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [periods, setPeriods] = useState<ICoursePeriods[]>([]);
  const [userRole, setUserRole] = useState<string>();

  const [coursesAndPeriods, setCoursesAndPeriods] = useState<
    ICourseAndPeriods[]
  >([]);

  useEffect(() => {
    getListCoursesAndPeriods();
    initUserRole();
  }, []);

  useEffect(() => {
    initcoursesAndPeriods();
  }, [periods && courses]);

  const initUserRole = () => {
    let session = getSessionFromStorage(); // we can only get here after user has logged in and therefore session is defined
    if (session) {
      let sessionAsObject = JSON.parse(session);
      let userRole = sessionAsObject.user.user_metadata.demo_app_role;
      setUserRole(userRole);
    }
  };

  const getListCoursesAndPeriods = async () => {
    let periods = await coursesAndPeriodsService.getAllPeriods();
    setPeriods(periods);

    let listCourses = await courseService.getCourseList();
    setCourses(listCourses);
  };

  const initcoursesAndPeriods = async () => {
    const initcoursesAndPeriods =
      await coursesAndPeriodsService.coursesAndPeriods(courses, periods);
    initcoursesAndPeriods.sort();
    setCoursesAndPeriods(initcoursesAndPeriods);
  };

  return (
    <table className="table table-striped changeCourseFeeTable">
      <thead className="d-flex flex-column">
        <tr className=" w-100">
          <td className=" fs-5 fw-bold text-black">
            {coursesTranslation("courses.changeCourseFee.coursesFee")}
          </td>
        </tr>
        <tr className="d-flex flex-row">
          <th id="start">
            {coursesTranslation("courses.changeCourseFee.courses")}
          </th>
          <th className="">1</th>
          <th className="">2</th>
          <th className="">3</th>
          <th className="">4</th>
          <th className="">5</th>
          <th className="">6</th>
          <th className="">7</th>
          <th className="">8</th>
          <th id="end">9</th>
        </tr>
      </thead>
      <tbody>
        {coursesAndPeriods.map((course, index) => {
          return (
            <tr key={index} className="d-flex flex-row">
              <th id="changeCourseFeeTable-start"> {course.name}</th>
              {course.coursePeriods.map((periods, index) => {
                return (
                  <td key={index} className=" ">
                    {periods.amountPay}
                  </td>
                );
              })}

              <EditFeeCourseModal
                selectedCoursePeriods={course}
                initcoursesAndPeriods={initcoursesAndPeriods}
                userRole={userRole}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ChangeCourseFee;
