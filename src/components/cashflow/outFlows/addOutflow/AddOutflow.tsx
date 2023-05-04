import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import IOutflow from "../../../../services/outflow/IOutflow";
import Outflow from "../../../../services/outflow/Outflow";
import IOutflowCategory from "../../../../services/outflow/outflowCategory/IOutflowCategory";
import { OutflowService } from "../../../../services/outflow/OutflowService";
import IOutflowError from "../../../../services/outflow/validations/IOutflowError";
import OutflowError from "../../../../services/outflow/validations/OutflowError";
import { OutflowValidationService } from "../../../../services/outflow/validations/OutflowValidationService";
import ModalOutflow from "./ModalOutflow";
import IPaymentMethod from "../../../../services/income/paymentMethods/IPaymentMethod";
import { container } from "tsyringe";

type ImportVariables = {
  initOutflowsCategory: Function;
  outflows: IOutflow[];
  outflowCategory: IOutflowCategory[];
  paymentMethods: IPaymentMethod[];
};

const AddOutflow = (props: ImportVariables) => {
  const outflowService = container.resolve(OutflowService);
  const outflowValidationService = container.resolve(OutflowValidationService);

  const [cashFlowTranslation] = useTranslation("cashFlow");

  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [outflow, setOutflow] = useState<IOutflow>(new Outflow());

  const [errors, setErrors] = useState<IOutflowError>(new OutflowError());

  const newOutflow = async () => {
    await outflowService.add(outflow);
    setShowModal(false);
  };
  const handleClose = () => {
    setShowModal(false);
    variablesReset();
  };

  const variablesReset = () => {
    setOutflow(new Outflow());
    setErrors(new OutflowError());
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const refreshErrors = () => {
    let outflowErrors = outflowValidationService.validateAddOutflow(outflow);
    setErrors(outflowErrors);
  };

  useEffect(() => {
    if (Object.values(errors).every((x) => x === "")) {
      newOutflow();
      handleClose();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  return (
    <div>
      <div onClick={() => handleShow()} className=" outFlowButton">
        {cashFlowTranslation("cashFlow.addOutflow.addOutflow")}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cashFlowTranslation("cashFlow.addOutflow.newOutflow")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Form>
            <ModalOutflow
              outflowCategory={props.outflowCategory}
              outflow={outflow}
              setOutflow={setOutflow}
              errors={errors}
              setSaveButtonEnabled={setSaveButtonEnabled}
              paymentMethods={props.paymentMethods}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            {cashFlowTranslation("cashFlow.addIncome.close")}
          </Button>
          <Button
            onClick={() => refreshErrors()}
            className="btn btn-success"
            disabled={saveButtonEnabled}
          >
            {cashFlowTranslation("cashFlow.addIncome.saveChanges")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddOutflow;
