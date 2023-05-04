import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { StudentService } from "../../../services/students/StudentService";
import IStudent from "../../../services/students/IStudent";
import Student from "../../../services/students/Student";
import { Form } from "react-bootstrap";
import StudentModal from "../studentModal/StudentModal";
import IGroup from "../../../services/group/IGroup";
import ICourse from "../../../services/course/ICourse";
import { container } from "tsyringe";
import { CourseService } from "../../../services/course/CourseService";
import { GroupService } from "../../../services/group/GroupService";
import IStudentError from "../../../services/students/validations/IStudentError";
import StudentError from "../../../services/students/validations/StudentError";
import { useTranslation } from "react-i18next";

type editProps = {
  students: IStudent[];
  student: IStudent;
  edit: Function;
};

const EditStudent = (props: editProps) => {
  const studentService = container.resolve(StudentService);
  const courseService = container.resolve(CourseService);
  const groupService = container.resolve(GroupService);

  const [studentsTranslation] = useTranslation("students");

  const [newStudent, setNewStudent] = useState<IStudent>(new Student());
  const [showModal, setShowModal] = useState<boolean>(false);

  const [courses, setCourses] = useState<ICourse[]>([]);

  const [groups, setGroups] = useState<IGroup[]>([]);
  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<IStudentError>(new StudentError());

  const [courseStartedDate, setCourseStartedDate] = useState<Date>(new Date());

  useEffect(() => {
    initCourses();
    initGroups();
    initNewStudent();
  }, []);

  //this function is needed to update the new student and add a day to "courseStartedDate" for the proper functioning of the student edit button  const refreshnewStudenttest = () => {
  const initNewStudent = () => {
    setNewStudent({
      ...props.student,
      courseStartedDate: new Date(props.student.courseStartedDate),
      datebirth: new Date(props.student.datebirth),
    });
  };

  const initCourses = async () => {
    let courses = await courseService.getCourseList();
    setCourses(courses);
  };

  const initGroups = async () => {
    let Groups = await groupService.get();
    setGroups(Groups);
  };

  const editStudent = async () => {
    var student = await studentService.edit(newStudent, props.student);
    props.edit(student);
    setShowModal(false);
  };
  // useEffect(() => {
  //   if (Object.values(errors).every((x) => x === "")) {
  //     editStudent();
  //     handleClose();
  //   } else {
  //     setSaveButtonEnabled(true);
  //   }
  // }, [errors]);
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
    // refreshDateStartFromNewStudent();
  };

  const refreshErrors = async () => {
    editStudent();
    handleClose();
    // let studentErrors =
    //   studentValidationService.validateEditStudent(newStudent);
    // setErrors(studentErrors);
  };
  return (
    <div className="d-flex flex-row-reverse bd-highlight">
      <Button onClick={() => handleShow()} className="btn btn-primary">
        {studentsTranslation("students.editStudent.edit")}
      </Button>
      <Modal show={showModal} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>
            {studentsTranslation("students.editStudent.editStudent")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Form>
            <StudentModal
              student={newStudent}
              setStudent={setNewStudent}
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
            {studentsTranslation("students.editStudent.close")}
          </Button>
          <Button onClick={() => refreshErrors()} className="btn btn-success">
            {studentsTranslation("students.editStudent.saveChanges")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditStudent;
