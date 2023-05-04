import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ICourse from "../../../services/course/ICourse";
import IStudent from "../../../services/students/IStudent";
import { StudentService } from "../../../services/students/StudentService";
import { container } from "tsyringe";

type props = {
  addStudentToCourse: Function;
  setStudentsCourse: React.Dispatch<React.SetStateAction<IStudent[]>>;
  course: ICourse;
};

const AddCourseStudents = (props: props) => {
  const studentsService = container.resolve(StudentService);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [studentIdSelectedToAdd, setStudentIdSelectedToAdd] =
    useState<number>(0);

  useEffect(() => {
    initStudentsList();
  }, []);

  const initStudentsList = async () => {
    var studentsList = await studentsService.getStudentsFromCourse(
      props.course.id
    );
    setStudents(studentsList);
  };

  const addStudentToCourse = async (studentId: number, courseId: number) => {
    var addedStudent = await studentsService.addCourseStudent(
      studentId,
      courseId
    );
    props.addStudentToCourse(addedStudent);
    removeStudentAddedFromModalStudents(addedStudent);
    setShowModal(false);
  };

  function removeStudentAddedFromModalStudents(modalStudentRemove: IStudent) {
    var filteredStudentsGroup = students.filter(
      (students) => students.id !== modalStudentRemove.id
    );
    setStudents(filteredStudentsGroup);
  }

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <div className="d-flex flex-row-reverse bd-highlight p-2 ">
      <Button onClick={() => handleShow()} className="btn btn-success">
        Add Student
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New student to group</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <div className="">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th>students</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  return (
                    <tr key={student.id}>
                      <td className="col-1">
                        <button
                          className="btn btn-link"
                          onClick={() => {
                            setStudentIdSelectedToAdd(student.id);
                          }}
                        >
                          {student.surname}
                        </button>
                      </td>
                      <td className="col-2">{student.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button
            className="btn btn-success "
            onClick={() => {
              addStudentToCourse(studentIdSelectedToAdd, props.course.id);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddCourseStudents;
