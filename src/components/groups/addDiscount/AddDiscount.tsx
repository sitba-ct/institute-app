import { container } from "tsyringe";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GroupService } from "../../../services/group/GroupService";
import { useEffect, useState } from "react";
import IDiscount from "../../../services/group/IDiscount";
import { GroupValidationService } from "../../../services/group/validations/GroupValidationService";
import "../groups.scss";
import { useTranslation } from "react-i18next";

type AddProps = {
  onSuccessDiscountAdd: Function;
  discount: IDiscount[];
};

const AddDiscount = (props: AddProps) => {
  const groupService = container.resolve(GroupService);
  const groupValidationService = container.resolve(GroupValidationService);

  const [groupsTranslation] = useTranslation("groups");

  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);

  const [newAmount, setNewAmount] = useState<number>(0);
  const [newDiscount, setNewDiscount] = useState<number>(0);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    newAmount: string | undefined;
    newDiscount: string | undefined;
  }>({
    newAmount: undefined,
    newDiscount: undefined,
  });

  const addNewDiscount = async (
    newAmount: number,
    newDiscount: number,
    discounts: IDiscount[]
  ) => {
    var discount = await groupService.addDiscounts(newAmount, newDiscount);
    var newdiscount = [...discounts, discount];
    props.onSuccessDiscountAdd(newdiscount);
    setNewAmount(0);
    setNewDiscount(0);
  };
  const handleClose = () => {
    setShowModal(false);
    setErrors({ newAmount: undefined, newDiscount: undefined });
  };
  const handleShow = () => {
    setShowModal(true);
  };

  const changeVariableAmount = (event: any) => {
    setSaveButtonEnabled(true);
    setNewAmount(event.target.value);
  };

  const changeVariablePorcent = (event: any) => {
    setSaveButtonEnabled(true);
    setNewDiscount(event.target.value / 100);
  };
  const refreshErrors = (amount: number, discount: number) => {
    let discountsErrors = groupValidationService.validateDiscount(
      amount,
      discount,
      props.discount
    );
    setErrors(discountsErrors);
  };

  useEffect(() => {
    if (errors.newAmount === "" && errors.newDiscount === "") {
      addNewDiscount(newAmount, newDiscount, props.discount);
      handleClose();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  return (
    <tr className="d-flex flex-row-reverse bd-highlight m-2">
      <td className="border border-0">
        <Button className="btn btn-success" onClick={handleShow}>
          {groupsTranslation("discount.addDiscount.newDiscount")}
        </Button>
      </td>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {groupsTranslation("discount.addDiscount.newDiscount")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="">
            {groupsTranslation("discount.addDiscount.memberAmount")}
          </h6>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="newmemberamount"
                onChange={changeVariableAmount}
                autoFocus
              />
            </Form.Group>
            {errors.newAmount && (
              <p className="errorMessage">{errors.newAmount}</p>
            )}
          </Form>
          <h6 className="">
            {" "}
            {groupsTranslation("discount.addDiscount.discoun")}
          </h6>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="porcentdiscount"
                onChange={changeVariablePorcent}
                autoFocus
              />
            </Form.Group>
            {errors.newDiscount && (
              <p className="errorMessage">{errors.newDiscount}</p>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            {groupsTranslation("discount.addDiscount.close")}
          </Button>
          <Button
            onClick={() => refreshErrors(newAmount, newDiscount)}
            className="btn btn-success"
          >
            {groupsTranslation("discount.addDiscount.saveChanges")}
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default AddDiscount;
