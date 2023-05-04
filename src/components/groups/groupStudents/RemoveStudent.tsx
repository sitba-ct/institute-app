import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { StudentService } from "../../../services/students/StudentService";
import IStudent from "../../../services/students/IStudent";
import { useTranslation } from "react-i18next";
import { container } from "tsyringe";

type deleteProps = {
  student: IStudent;
  refreshStudentsGroup: Function;
};

const RemoveStudent = (props: deleteProps) => {
  const studentsService = container.resolve(StudentService);
  const [groupsTranslation] = useTranslation("groups");

  const removeStudentFromGroup = async () => {
    var deletedGroup = await studentsService.removeStudentFromGroup(
      props.student.id
    );
    props.refreshStudentsGroup(deletedGroup.id);
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <td>
      <Button onClick={() => setShowModal(true)} className="btn btn-danger ">
        X
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3>
            {groupsTranslation(
              "groups.groupStudents.removeGroupStudent.advise"
            )}
            {props.student.name}
            {groupsTranslation(
              "groups.groupStudents.removeGroupStudent.advise2"
            )}
          </h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {groupsTranslation("groups.groupStudents.removeGroupStudent.no")}
          </Button>
          <Button
            onClick={() => {
              removeStudentFromGroup();
              setShowModal(false);
            }}
          >
            {groupsTranslation("groups.groupStudents.removeGroupStudent.yes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </td>
  );
};

export default RemoveStudent;
