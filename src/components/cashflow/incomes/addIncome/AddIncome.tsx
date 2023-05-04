import { useEffect, useState } from "react";
import Income from "../../../../services/income/Income";
import IIncome from "../../../../services/income/IIncome";
import { IncomeService } from "../../../../services/income/IncomeService";
import ModalIncome from "./modalIncome";
import { Button, Form, Modal } from "react-bootstrap";
import IIncomeCategory from "../../../../services/income/incomeCategory/IIncomeCategory";
import { IncomeValidationService } from "../../../../services/income/validations/IncomeValidationService";
import IncomeError from "../../../../services/income/validations/IncomeError";
import IIncomeError from "../../../../services/income/validations/IIncomeError";
import "./addIncome.scss";
import { StudentService } from "../../../../services/students/StudentService";
import IStudentBasicInfo from "../../../../services/students/BasicInfo/IBasicInfo";
import { useTranslation } from "react-i18next";
import IPaymentMethod from "../../../../services/income/paymentMethods/IPaymentMethod";
import { container } from "tsyringe";

type ImportVariables = {
  initIncomesCategory: Function;
  incomes: IIncome[];
  incomeCategory: IIncomeCategory[];
  paymentMethods: IPaymentMethod[];
};

const AddIncome = (props: ImportVariables) => {
  const incomeService = container.resolve(IncomeService);
  const incomeValidationService = container.resolve(IncomeValidationService);
  const studentService = container.resolve(StudentService);

  const [cashFlowTranslation] = useTranslation("cashFlow");

  const [showModal, setShowModal] = useState<boolean>(false);

  const [income, setIncome] = useState<IIncome>(new Income());
  const [showStudentName, setShowStudentName] = useState<boolean>(true);
  const [students, setStudents] = useState<IStudentBasicInfo[]>([]);
  const [studentIncomes, setStudentIncomes] = useState<Income[]>();

  const [errors, setErrors] = useState<IIncomeError>(new IncomeError());

  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(true);

  useEffect(() => {
    initStudent();
  }, []);

  const initStudent = async () => {
    let studentsBasicInfo = await studentService.getStudentsBasicInfo();
    setStudents(studentsBasicInfo);
  };

  const initStudentIncomes = async () => {
    if (income.studentId !== null) {
      let studentIncomes = await incomeService.getStudentIncomes(income);
      setStudentIncomes(studentIncomes);
    } else {
      setStudentIncomes([new Income()]);
    }
  };

  const newIncome = async () => {
    incomeService.add(income);
  };

  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    variablesReset();
  };

  const variablesReset = () => {
    setIncome(new Income());
    setErrors(new IncomeError());
    setShowStudentName(true);
  };

  useEffect(() => {
    if (studentIncomes !== undefined) {
      let incomesErrors = incomeValidationService.validateAddIncome(
        income,
        studentIncomes
      );
      setErrors(incomesErrors);
    }
  }, [studentIncomes]);

  useEffect(() => {
    if (Object.values(errors).every((x) => x === "")) {
      newIncome();
      handleClose();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  return (
    <div>
      <div onClick={() => handleShow()} className=" incomeButton">
        {cashFlowTranslation("cashFlow.addIncome.addIncome")}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cashFlowTranslation("cashFlow.addIncome.newIncome")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Form>
            <ModalIncome
              incomeCategory={props.incomeCategory}
              income={income}
              setIncome={setIncome}
              errors={errors}
              setSaveButtonEnabled={setSaveButtonEnabled}
              setShowStudentName={setShowStudentName}
              showStudentName={showStudentName}
              students={students}
              paymentMethods={props.paymentMethods}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            {cashFlowTranslation("cashFlow.addIncome.close")}
          </Button>
          <Button
            onClick={() => initStudentIncomes()}
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

export default AddIncome;
