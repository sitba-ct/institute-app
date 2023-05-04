import { StudentService } from "../../../services/students/StudentService";
import "../courses.scss";
import { useContext, useEffect, useState } from "react";
import IStudent from "../../../services/students/IStudent";
import ICourse from "../../../services/course/ICourse";
import "./courseStudents.scss";
import { CourseContext } from "../../../context/CourseContextProvider";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../utils/supabaseClient";
import BockletPayment from "../../../services/payments/BockletPayment";
import IBockletPayment from "../../../services/payments/IBookletPayment";
import { Icon } from "@iconify/react";
import { container } from "tsyringe";

export type CourseContextType = {
  state: ICourse;
  setState: (value: ICourse) => void;
};

const CourseStudents = () => {
  const course = useContext(CourseContext);

  const [coursesTranslation] = useTranslation("courses");

  const [courseStudents, setCourseStudents] = useState<IStudent[]>([]);
  const [bockletsPaid, setBockletsPaid] = useState<IBockletPayment[]>([
    new BockletPayment(),
  ]);

  const [bockletsNoPaid, setBockletsNoPaid] = useState<IBockletPayment[]>([]);
  const studentService = container.resolve(StudentService);

  useEffect(() => {
    if (course.course.id !== 0 && course.course.id !== undefined) {
      initCourseStudents(course.course.id);
    }
    bookletPayment();
  }, [course]);

  const initCourseStudents = async (courseId: number) => {
    var courseStudents = await studentService.getCourseStudents(courseId);
    setCourseStudents(courseStudents);
  };

  const bookletPayment = async () => {
    let courseSelected = course.course.id;
    let { data, error } = await supabase.rpc("bookletPayment", {
      courseSelected,
    });
    if (error) console.error(error);
    if (data !== null) {
      setBockletsPaid(data);
    }
  };

  useEffect(() => {
    const newArray: IBockletPayment[] = [];

    for (let obj1 of courseStudents) {
      let found = false;
      for (let obj2 of bockletsPaid) {
        if (obj1.id === obj2.courseStudentId) {
          found = true;
          break;
        }
      }
      if (!found) {
        newArray.push({
          courseStudentId: obj1.id,
          studentName: obj1.name,
          studentSurname: obj1.surname,
          totalAmount: 0,
        });
      }
    }

    for (let obj2 of bockletsPaid) {
      let found = false;
      for (let obj1 of courseStudents) {
        if (obj2.courseStudentId === obj1.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        newArray.push(obj2);
      }
    }
    setBockletsNoPaid(newArray);
  }, [bockletsPaid, courseStudents]);
  return (
    <div>
      <table className="table table-striped courseStudentsTable">
        <thead className="border-bottom">
          <tr className="border-dark rounded">
            {course ? (
              <th>
                {coursesTranslation("courses.courseStudents.group")}
                {course.course.name}
              </th>
            ) : (
              <></>
            )}
          </tr>
          <tr className=" headStudentsName">
            <th className=" text-center">
              {coursesTranslation("courses.courseStudents.studentsName")}
            </th>
            <th className=" text-center headBookletPayment">
              {coursesTranslation("courses.courseStudents.bookletPayment")}
            </th>
          </tr>
        </thead>
        <tbody>
          {bockletsPaid.map((booklet) => {
            return (
              <tr key={booklet.courseStudentId} className={"d-flex text-start"}>
                <td className="w-50  border-0 border-bottom text-end">
                  {booklet.studentName}
                </td>
                <td className="w-50 border-0 border-bottom text-start">
                  {booklet.studentSurname}
                </td>
                <td className="w-50 border-0 border-bottom text-center">
                  ${booklet.totalAmount}
                  <Icon icon="bx:book-bookmark" color="blue" />
                </td>
              </tr>
            );
          })}

          {bockletsNoPaid.map((booklet) => {
            return (
              <tr key={booklet.courseStudentId} className="d-flex text-start">
                <td className="w-50  border-0 border-bottom text-end">
                  {booklet.studentName}
                </td>
                <td className="w-50 border-0 border-bottom text-start ">
                  {booklet.studentSurname}
                </td>
                <td className="w-50 border-0 border-bottom text-center ">
                  $0
                  <Icon icon="bx:book-bookmark" color="red" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default CourseStudents;
