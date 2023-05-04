import { container } from "tsyringe";
import IGroup from "../../../services/group/IGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GroupService } from "../../../services/group/GroupService";
import { useEffect, useState } from "react";
import "../groups.scss";
import IGroupError from "../../../services/group/IGroupError";
import { GroupValidationService } from "../../../services/group/validations/GroupValidationService";
import { useTranslation } from "react-i18next";

type AddProps = {
  onSuccessGroupAdd: Function;
  groups: IGroup[];
};

const AddGroup = (props: AddProps) => {
  const groupService = container.resolve(GroupService);
  const groupValidationService = container.resolve(GroupValidationService);

  const [groupsTranslation] = useTranslation("groups");

  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);

  const [newName, setNewName] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);

  const [errors, setErrors] = useState<IGroupError>({
    name: undefined,
  });

  const addNewGroup = async (newName: string, groups: IGroup[]) => {
    var group = await groupService.add(newName);
    var newGroups = [...groups, group];
    props.onSuccessGroupAdd(newGroups);
    setNewName("");
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
    setErrors({ name: undefined });
  };

  const changeVariableName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaveButtonEnabled(false);
    setNewName(event.target.value.trim().toLowerCase());
  };

  useEffect(() => {
    if (errors.name === "") {
      addNewGroup(newName, props.groups);
      handleClose();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  const refreshErrors = (name: string) => {
    let groupErrors = groupValidationService.validateName(name, props.groups);
    setErrors(groupErrors);
  };

  return (
    <tr className="d-flex flex-row-reverse bd-highlight m-2">
      <td className="border border-0">
        <Button onClick={handleShow} className="btn btn-success">
          {groupsTranslation("groups.addGroup.addGroup")}
        </Button>
      </td>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {groupsTranslation("groups.addGroup.newGroup")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="">{groupsTranslation("groups.addGroup.name")}</h6>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="string"
                name="newName"
                onChange={changeVariableName}
                autoFocus
                required
              />
            </Form.Group>
            {errors.name && <p className="errorMessage">{errors.name}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            {groupsTranslation("groups.addGroup.close")}
          </Button>
          <Button
            onClick={() => refreshErrors(newName)}
            className="btn btn-success"
            disabled={saveButtonEnabled}
          >
            {groupsTranslation("groups.addGroup.saveChanges")}
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default AddGroup;
