import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import ICategoryMonthlyIncome from "../../../../services/income/incomePerMonthAndCategory/ICategoryMonthlyIncome";
import PaymentMethod from "../../../../services/income/paymentMethods/PaymentMethod";
import IncomeCategory from "../../../../services/income/incomeCategory/IncomeCategory";
import CategoryMonthlyIncome from "../../../../services/income/incomePerMonthAndCategory/CategoryMonthlyIncome";

const AddIncome = () => {
  const incomeService = container.resolve(IncomeService);
  const incomeValidationService = container.resolve(IncomeValidationService);

  const [cashFlowTranslation] = useTranslation("cashFlow");

  const [showModal, setShowModal] = useState<boolean>(false);

  const [income, setIncome] = useState<IIncome>(new Income());
  const [showStudentName, setShowStudentName] = useState<boolean>(true);
  const [students, setStudents] = useState<IStudentBasicInfo[]>([]);
  const [studentIncomes, setStudentIncomes] = useState<Income[]>();
  const [incomesCategory, setIncomesCategory] = useState<
    ICategoryMonthlyIncome[]
  >([new CategoryMonthlyIncome()]);
  const [incomeCategory, setIncomeCategory] = useState<IIncomeCategory[]>([
    new IncomeCategory(),
  ]);
  const [paymentMethods, setPaymentMethod] = useState<IPaymentMethod[]>([
    new PaymentMethod(),
  ]);
  const [incomes, setIncomes] = useState<IIncome[]>([new Income()]);
  const [errors, setErrors] = useState<IIncomeError>(new IncomeError());

  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(true);

  useEffect(() => {
    initData(
      incomeService,
      setIncomesCategory,
      setIncomeCategory,
      setPaymentMethod,
      setIncomes,
      setStudents
    );
  }, []);

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
      <div onClick={() => handleShow()} className="incomeButton">
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
              incomeCategory={incomeCategory}
              income={income}
              setIncome={setIncome}
              errors={errors}
              setSaveButtonEnabled={setSaveButtonEnabled}
              setShowStudentName={setShowStudentName}
              showStudentName={showStudentName}
              students={students}
              paymentMethods={paymentMethods}
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

export async function initData(
  incomeService: IncomeService,
  setIncomesCategory: Dispatch<SetStateAction<ICategoryMonthlyIncome[]>>,
  setIncomeCategory: Dispatch<SetStateAction<IIncomeCategory[]>>,
  setPaymentMethod: Dispatch<SetStateAction<IPaymentMethod[]>>,
  setIncomes: Dispatch<SetStateAction<IIncome[]>>,
  setStudents: Dispatch<SetStateAction<IStudentBasicInfo[]>>
) {
  initIncomesCategory(incomeService, setIncomesCategory);
  initpaymentMethod(incomeService, setPaymentMethod);
  initIncomes(incomeService, setIncomes);
  initIncomeCategory(incomeService, setIncomeCategory);
  initStudent(setStudents);
}

export async function initIncomeCategory(
  incomeService: IncomeService,
  setIncomeCategory: Dispatch<SetStateAction<IIncomeCategory[]>>
) {
  let incomeCategory = await incomeService.getIncomeCategorysList();
  setIncomeCategory(incomeCategory);
}

export async function initpaymentMethod(
  incomeService: IncomeService,
  setPaymentMethod: Dispatch<SetStateAction<IPaymentMethod[]>>
) {
  let paymentMethodsList = await incomeService.getPaymentMethodsList();
  setPaymentMethod(paymentMethodsList);
}

export async function initIncomes(
  incomeService: IncomeService,
  setIncomes: Dispatch<SetStateAction<IIncome[]>>
) {
  let incomes = await incomeService.getIncomes();
  setIncomes(incomes);
}

export async function initIncomesCategory(
  incomeService: IncomeService,
  setIncomesCategory: Dispatch<SetStateAction<ICategoryMonthlyIncome[]>>
) {
  let categoryIncomes = await incomeService.getIncomesCategoryDetailed();
  let categoryMonthlyIncome = incomeService.getMonthlyIncomes(categoryIncomes);
  setIncomesCategory(categoryMonthlyIncome);
}

export async function initStudent(
  setStudents: Dispatch<SetStateAction<IStudentBasicInfo[]>>
) {
  const studentService = container.resolve(StudentService);

  let studentsBasicInfo = await studentService.getStudentsBasicInfo();
  setStudents(studentsBasicInfo);
}
