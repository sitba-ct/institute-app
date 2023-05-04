import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { container } from "tsyringe";
import { CourseService } from "../../../../services/course/CourseService";
import ICourse from "../../../../services/course/ICourse";
import IStudentDetail from "../../../../services/students/studentDetail/IStudentDetail";
import { StudentService } from "../../../../services/students/StudentService";

type props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  studentDetail: IStudentDetail;
  setStudentAuxId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const CourseChangeModal = (props: props) => {
  const courseService = container.resolve(CourseService);
  const studentService = container.resolve(StudentService);

  const [studentsTranslation] = useTranslation("students");

  const [showChangeModal, setShowChangeModal] = useState<boolean>(true);

  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);

  const [validation, setValidation] = useState<string | undefined>(undefined);

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [courseIdSelectedToAdd, setCourseIdSelectedToAdd] = useState<number>(0);

  const handleClose = () => {
    props.setShowModal(false);
  };
  const handleShow = () => {
    props.setShowModal(true);
    setSaveButtonEnabled(false);
  };
  useEffect(() => {
    handleShow();
  }, []);

  const refreshValidation = () => {
    let courseValidation =
      props.studentDetail.unpayedPeriods.length === 0
        ? ""
        : "To change the course all unpaid fees have to be paid";
    setValidation(courseValidation);
  };

  useEffect(() => {
    if (validation === "") {
      setShowChangeModal(false);
      initListCourses();
    } else {
      setSaveButtonEnabled(false);
    }
  }, [validation]);

  const initListCourses = async () => {
    let listCourses = await courseService.getCourseList();
    setCourses(listCourses);
  };

  const addStudentToCourse = async (studentId: number, courseId: number) => {
    await studentService.addCourseStudent(studentId, courseId);
    props.setStudentAuxId(-1);
    props.setShowModal(false);
  };

  return (
    <div>
      {showChangeModal ? (
        <Modal show={props.showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <Form>
              <h6>
                {studentsTranslation(
                  "students.studentCourseCard.courseChangeModal.changeStudentCourse"
                )}
              </h6>
              {showChangeModal && <p className="errorMessage">{validation}</p>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>
              {studentsTranslation(
                "students.studentCourseCard.courseChangeModal.cancel"
              )}
            </Button>
            <Button
              onClick={() => {
                refreshValidation();
              }}
              className="btn btn-success"
              disabled={saveButtonEnabled}
            >
              {studentsTranslation(
                "students.studentCourseCard.courseChangeModal.yes"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={props.showModal} onHide={handleClose}>
          <Modal.Body className="">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th>
                    {studentsTranslation(
                      "students.studentCourseCard.courseChangeModal.choseTheCourse"
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => {
                  return (
                    <tr>
                      <td className="col-1" key={course.id}>
                        <button
                          className="btn btn-link"
                          onClick={() => {
                            setCourseIdSelectedToAdd(course.id);
                          }}
                        >
                          {course.name}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>
              {studentsTranslation(
                "students.studentCourseCard.courseChangeModal.close"
              )}
            </Button>
            <Button
              onClick={() => {
                addStudentToCourse(
                  props.studentDetail.student.id,
                  courseIdSelectedToAdd
                );
              }}
              className="btn btn-success"
            >
              {studentsTranslation(
                "students.studentCourseCard.courseChangeModal.change"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
export default CourseChangeModal;
