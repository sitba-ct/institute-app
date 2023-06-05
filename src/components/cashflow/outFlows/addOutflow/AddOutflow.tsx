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
import { IncomeService } from "../../../../services/income/IncomeService";
import IOutflowCategoryMonthly from "../../../../services/outflow/outflowPerMonthAndCategory/IOutflowCategoryMonthly";
import OutflowCategoryMonthly from "../../../../services/outflow/outflowPerMonthAndCategory/OutflowCategoryMonthly";
import OutflowCategory from "../../../../services/outflow/outflowCategory/OutflowCategory";
import PaymentMethod from "../../../../services/income/paymentMethods/PaymentMethod";
import "./addOutflow.scss";
import { AiOutlineMinus } from "react-icons/ai";

const AddOutflow = () => {
  const outflowService = container.resolve(OutflowService);
  const outflowValidationService = container.resolve(OutflowValidationService);
  const incomeService = container.resolve(IncomeService);

  const [cashFlowTranslation] = useTranslation("cashFlow");

  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [outflow, setOutflow] = useState<IOutflow>(new Outflow());
  const [paymentMethods, setPaymentMethod] = useState<IPaymentMethod[]>([
    new PaymentMethod(),
  ]);

  const [, setOutflowsCategory] = useState<IOutflowCategoryMonthly[]>([
    new OutflowCategoryMonthly(),
  ]);
  const [outflows, setOutflows] = useState<IOutflow[]>([new Outflow()]);
  const [outflowCategory, setOutflowCategory] = useState<IOutflowCategory[]>([
    new OutflowCategory(),
  ]);

  const [errors, setErrors] = useState<IOutflowError>(new OutflowError());

  useEffect(() => {
    initOutflowsCategory();
    initOutflows();
    initpaymentMethod();
    initOutflowCategory();
  }, []);

  const initOutflows = async () => {
    let outflow = await outflowService.getOutflow();
    setOutflows(outflow);
  };

  const initOutflowCategory = async () => {
    let outflowCategory = await outflowService.getOutflowCategorysList();
    setOutflowCategory(outflowCategory);
  };

  const initOutflowsCategory = async () => {
    let categoryOutflow = await outflowService.getOutflowCategoryDetailed();
    let categoryMonthlyOutflow =
      outflowService.getMonthlyOutflow(categoryOutflow);
    setOutflowsCategory(categoryMonthlyOutflow);
  };

  const initpaymentMethod = async () => {
    let paymentMethodsList = await incomeService.getPaymentMethodsList();
    setPaymentMethod(paymentMethodsList);
  };

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
    <div className="ouflow-container">
      <div onClick={() => handleShow()} className="ouflow-container__button">
        <AiOutlineMinus size="1.5rem" className="me-3" />
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
              outflowCategory={outflowCategory}
              outflow={outflow}
              setOutflow={setOutflow}
              errors={errors}
              setSaveButtonEnabled={setSaveButtonEnabled}
              paymentMethods={paymentMethods}
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
