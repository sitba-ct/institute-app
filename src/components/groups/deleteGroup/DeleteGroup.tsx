import { container } from "tsyringe";
import { useEffect, useState } from "react";
import { GroupService } from "../../../services/group/GroupService";
import IGroup from "../../../services/group/IGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { StudentService } from "../../../services/students/StudentService";

type deleteProps = {
  group: IGroup;
  onSuccessGroupDelete: Function;
};

const DeleteGroup = (props: deleteProps) => {
  const groupService = container.resolve(GroupService);
  const studentService = container.resolve(StudentService);

  const [groupsTranslation] = useTranslation("groups");
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>();
  const initGroupsDelete = async () => {
    var deletedGroup = await groupService.delete(props.group.id);
    props.onSuccessGroupDelete(deletedGroup);
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  const initStudentsGroup = async () => {
    var studentsList = await studentService.getStudentsGroup(props.group.id);
    if (studentsList.length === 0) {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
      setErrors("groups.delete.error");
    }
  };

  return (
    <td>
      <Button
        onClick={() => {
          setShowModal(true);
          initStudentsGroup();
        }}
        className="btn btn-danger"
      >
        X
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3>
            {groupsTranslation("groups.delete.delete")} {props.group.name} ?
          </h3>
        </Modal.Body>
        {errors && (
          <p className="errorMessage  text-center">
            {groupsTranslation(errors)}
          </p>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {groupsTranslation("groups.delete.no")}
          </Button>
          <Button
            onClick={() => {
              initGroupsDelete();
              setShowModal(false);
            }}
            disabled={saveButtonDisabled}
          >
            {groupsTranslation("groups.delete.yes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </td>
  );
};

export default DeleteGroup;
