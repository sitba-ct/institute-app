import { useEffect, useState } from "react";
import { GroupService } from "../../../services/group/GroupService";
import IGroup from "../../../services/group/IGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Group from "../../../services/group/Group";
import { GroupValidationService } from "../../../services/group/validations/GroupValidationService";
import IGroupError from "../../../services/group/IGroupError";
import "../groups.scss";
import { useTranslation } from "react-i18next";
import { container } from "tsyringe";

type editProps = {
  group: IGroup;
  groups: IGroup[];
  onSuccessGroupEdit: Function;
};

const EditGroup = (props: editProps) => {
  const groupService = container.resolve(GroupService);
  const groupValidationService = container.resolve(GroupValidationService);

  const [groupsTranslation] = useTranslation("groups");

  const [groupToEdit, setGroupToEdit] = useState<IGroup>(new Group(-1, ""));

  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(true);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [errors, setErrors] = useState<IGroupError>({
    name: undefined,
  });

  const editGroup = async () => {
    var group = await groupService.edit(groupToEdit);
    setShowModal(false);
    props.onSuccessGroupEdit(group);
  };

  const refreshErrors = () => {
    let groupErrors = groupValidationService.validateName(
      groupToEdit.name,
      props.groups
    );
    setErrors(groupErrors);
  };

  const variablesReset = () => {
    setErrors({
      name: undefined,
    });
  };

  useEffect(() => {
    if (errors.name === "") {
      editGroup();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  return (
    <td>
      <Button
        onClick={() => {
          setShowModal(true);
          setGroupToEdit({
            id: -1,
            name: "",
          });
        }}
        className="btn btn-primary"
      >
        {groupsTranslation("groups.edit.edit")}
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3>
            {groupsTranslation("groups.edit.change")} {props.group.name}
            {groupsTranslation("groups.edit.change1") + ":"}
          </h3>
          <input
            type="text"
            value={groupToEdit.name}
            onChange={(e) => {
              setGroupToEdit({
                ...groupToEdit,
                id: props.group.id,
                name: e.target.value,
              });
              setSaveButtonEnabled(false);
            }}
          />
          {errors.name && <p className="errorMessage">{errors.name}</p>}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              variablesReset();
            }}
          >
            {groupsTranslation("groups.edit.no")}
          </Button>
          <Button onClick={() => refreshErrors()} disabled={saveButtonEnabled}>
            {groupsTranslation("groups.edit.yes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </td>
  );
};

export default EditGroup;
