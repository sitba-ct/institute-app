import { container } from "tsyringe";
import { CourseService } from "../../../services/course/CourseService";
import ICourse from "../../../services/course/ICourse";
import EditCourse from "../editCourse/EditCourse";
import "./listCourse.scss";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../../../context/CourseContextProvider";
import { useTranslation } from "react-i18next";
import AddCourse from "../addCourse/AddCourse";
import getSessionFromStorage from "../../../services/auth/SessionService";

export type CourseContextType = {
  state: ICourse;
  setState: (value: ICourse) => void;
};

const ListCourses = () => {
  let navigate = useNavigate();
  const [coursesTranslation] = useTranslation("courses");

  const courseService = container.resolve(CourseService);

  const [courses, setCourses] = useState<ICourse[]>([]);
  const { course, setCourse } = useContext(CourseContext);
  const [userRole, setUserRole] = useState<string>("noRole");

  useEffect(() => {
    initUserRole();
    getListCourses();
  }, []);

  const initUserRole = () => {
    let userRole = getUserRole();
    setUserRole(userRole);
  };

  const getListCourses = async () => {
    let listCourses = await courseService.getCourseList();
    const listCoursesAlpabhet = orderCurses(listCourses);
    setCourses(listCoursesAlpabhet);
  };

  const addCourse = (newCourse: ICourse[]) => {
    setCourses(newCourse);
  };

  function onSuccessCourseEdit(editCourse: ICourse) {
    var filteredCourse = courses.map((course) => {
      if (course.id === editCourse.id) {
        return (course = editCourse);
      }
      return course;
    });
    setCourses(filteredCourse);
  }

  return (
    <div className=" d-flex flex-row containerGeneral">
      <table className="table table-striped listCoursesTable ">
        <thead>
          <tr className=" d-flex flex-column ">
            <th className="w-100 text-center ps-4">
              {coursesTranslation("courses.listCourses.listCourses")}
            </th>
          </tr>
          <tr className=" d-flex flex-row ">
            <th id="headName">
              {coursesTranslation("courses.listCourses.name")}
            </th>
            <th id="headFee">
              {coursesTranslation("courses.listCourses.initialFee")}
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            return (
              <tr key={course.id}>
                <td
                  id="bodyName"
                  onClick={() => {
                    setCourse(course);
                    navigate(`students`);
                  }}
                >
                  <u>{course.name}</u>
                </td>
                <td id="bodyFee">{course.initialFee}</td>
                <td id="bodyEdit">
                  <EditCourse
                    courses={courses}
                    onSuccessCourseEdit={onSuccessCourseEdit}
                    courseSelected={course}
                    userRole={userRole}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot className={"flex-row-reverse"}>
          <AddCourse
            courseAdd={addCourse}
            courses={courses}
            userRole={userRole}
          />
        </tfoot>
      </table>
    </div>
  );
};
export default ListCourses;

const getUserRole = () => {
  let session = getSessionFromStorage(); // we can only get here after user has logged in and therefore session is defined
  if (session) {
    let sessionAsObject = JSON.parse(session);
    let userRole = sessionAsObject.user.user_metadata.ken_role;
    return userRole;
  }
};

const orderCurses = (listCourses: ICourse[]) => {
  const listCoursesAlpabhet = listCourses.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return listCoursesAlpabhet;
};
