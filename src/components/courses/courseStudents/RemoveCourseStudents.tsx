import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { StudentService } from "../../../services/students/StudentService";
import IStudent from "../../../services/students/IStudent";
import { container } from "tsyringe";

type deleteProps = {
  student: IStudent;
  removeStudentFromCourse: Function;
};

const RemoveCourseStudents = (props: deleteProps) => {
  const studentsService = container.resolve(StudentService);
  const removeStudentFromCourse = async () => {
    var removedStudent = await studentsService.removeCourseStudent(
      props.student.id
    );
    props.removeStudentFromCourse(removedStudent.id);
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <td>
      <Button onClick={() => setShowModal(true)} className="btn btn-danger">
        X
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3>Do you want to remove {props.student.name} from group ?</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button
            onClick={() => {
              removeStudentFromCourse();
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </td>
  );
};

export default RemoveCourseStudents;
