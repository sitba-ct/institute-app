import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import IStudent from "../../../services/students/IStudent";
import { StudentService } from "../../../services/students/StudentService";
import ICourse from "../../../services/course/ICourse";
import IGroup from "../../../services/group/IGroup";
import { CourseService } from "../../../services/course/CourseService";
import { GroupService } from "../../../services/group/GroupService";
import Student from "../../../services/students/Student";
import StudentModal from "../studentModal/StudentModal";
import IStudentError from "../../../services/students/validations/IStudentError";
import StudentError from "../../../services/students/validations/StudentError";
import { StudentValidationService } from "../../../services/students/validations/StudentValidationService";
import { useTranslation } from "react-i18next";
import { container } from "tsyringe";

type ImportVariables = {
  addStudent: Function;
  students: IStudent[];
};

const AddStudent = (props: ImportVariables) => {
  const studentService = container.resolve(StudentService);
  const courseService = container.resolve(CourseService);
  const groupService = container.resolve(GroupService);
  const studentValidationService = container.resolve(StudentValidationService);

  const [studentsTranslation] = useTranslation("students");

  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);

  const [student, setStudent] = useState<IStudent>(new Student());
  const [students, setStudents] = useState<IStudent[]>([]);

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);

  const [courseStartedDate, setCourseStartedDate] = useState<Date>(new Date());

  const [showModal, setShowModal] = useState<boolean>(false);

  const [errors, setErrors] = useState<IStudentError>(new StudentError());

  useEffect(() => {
    initCourses();
    initGroups();
    initStudent();
  }, []);

  const initStudent = async () => {
    const studentsService = container.resolve(StudentService);
    setStudents(students);
  };

  const initCourses = async () => {
    let courses = await courseService.getCourseList();
    setCourses(courses);
  };

  const initGroups = async () => {
    let Groups = await groupService.get();
    setGroups(Groups);
  };

  useEffect(() => {
    if (Object.values(errors).every((x) => x === "")) {
      alert("cargado con existo");
      addNewStudent();
      handleClose();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  const addNewStudent = async () => {
    var newStudentObject = await studentService.add(student);
    var newCourse = [...props.students, newStudentObject];
    props.addStudent(newCourse);
    setShowModal(false);
    variablesReset();
  };
  const handleClose = () => {
    setShowModal(false);
    variablesReset();
  };
  const handleShow = () => {
    setShowModal(true);
    setErrors(new StudentError());
  };

  const variablesReset = () => {
    setStudent(new Student());
  };

  const refreshErrors = () => {
    let studentErrors = studentValidationService.validateAddStudent(
      students,
      student
    );
    setErrors(studentErrors);
  };

  useEffect(() => {
    const courseStartedDateSelected = courses.find(
      (course) => course.id === student.courseId
    );
    courseStartedDateSelected ? (
      setStudent({
        ...student,
        courseStartedDate: new Date(
          new Date(courseStartedDateSelected.startDate).getTime() + 86400000
        ),
      })
    ) : (
      <></>
    );
  }, [student.courseId]);

  return (
    <tr className="d-flex flex-row-reverse bd-highlight">
      <td className="border border-0">
        <Button onClick={() => handleShow()} className="btn btn-success">
          {studentsTranslation("students.addStudent.add")}
        </Button>
      </td>
      <Modal show={showModal} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>
            {studentsTranslation("students.addStudent.newStudent")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Form>
            <StudentModal
              student={student}
              setStudent={setStudent}
              courses={courses}
              groups={groups}
              errors={errors}
              setSaveButtonEnabled={setSaveButtonEnabled}
              courseStartedDate={courseStartedDate}
              setCourseStartedDate={setCourseStartedDate}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            {studentsTranslation("students.addStudent.close")}
          </Button>

          <Button
            onClick={() => refreshErrors()}
            className="btn btn-success"
            disabled={saveButtonEnabled}
          >
            {studentsTranslation("students.addStudent.saveChanges")}
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default AddStudent;
