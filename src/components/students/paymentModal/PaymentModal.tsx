import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import IIncome from "../../../services/income/IIncome";
import Income from "../../../services/income/Income";
import { IncomeService } from "../../../services/income/IncomeService";
import IPaymentMethod from "../../../services/income/paymentMethods/IPaymentMethod";
import PaymentMethod from "../../../services/income/paymentMethods/PaymentMethod";
import { PaymentsService } from "../../../services/payments/PaymentsService";
import IStudentPeriodFeePayment from "../../../services/students/feePayment/IStudentPeriodFeePayment";
import IStudentDetail from "../../../services/students/studentDetail/IStudentDetail";
import { StudentService } from "../../../services/students/StudentService";
import { StudentValidationService } from "../../../services/students/validations/StudentValidationService";
import { container } from "tsyringe";

type variables = {
  studentDetail: IStudentDetail;
  totalToPay: number;
  setStudentAuxId: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedFee: IStudentPeriodFeePayment[];
  cleanSelectedFees: Function;
};

const PaymentModal = (props: variables) => {
  const studentService = container.resolve(StudentService);
  const studentValidationService = container.resolve(StudentValidationService);
  const incomeService = container.resolve(IncomeService);
  const paymentsService = container.resolve(PaymentsService);

  const [income, setIncome] = useState<IIncome>(new Income());

  const [paymentMethods, setPaymentMethod] = useState<IPaymentMethod[]>([
    new PaymentMethod(),
  ]);

  const [studentsTranslation] = useTranslation("students");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(true);

  const [amountPay, setAmountPay] = useState<number>(0);

  useEffect(() => {
    initpaymentMethod();
    initIncomeCategory();
    setAmountPay(props.totalToPay);
  }, [props.totalToPay]);

  const initpaymentMethod = async () => {
    let paymentMethodsList = await incomeService.getPaymentMethodsList();
    setPaymentMethod(paymentMethodsList);
  };

  const initIncomeCategory = async () => {
    let IncomeCategorysList = await incomeService.getIncomeCategorysList();
    let courseCategory = IncomeCategorysList.find(
      (category) => category.name === "Cuotas"
    );
    courseCategory !== undefined
      ? setIncome({
          ...income,
          incomeCategoryId: Number(courseCategory.id),
          studentId: props.studentDetail.student.id,
        })
      : console.error();
  };

  const addStudentPayment = async () => {
    let newIncome: IIncome = await studentService.addIncome(
      income,
      props.totalToPay
    );

    await paymentsService.addStudentPaidPeriods(
      props.studentDetail.student.id,
      newIncome.id,
      props.selectedFee,
      props.studentDetail.student.courseId.id
    );
    props.setStudentAuxId(-1);
    setShowModal(false);
  };

  const inputsVerification = () => {
    studentValidationService.isPaymentValid(income, amountPay)
      ? addStudentPayment()
      : noOkVerification();
  };

  function noOkVerification() {
    setSaveButtonEnabled(false);
  }

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
    setSaveButtonEnabled(true);
  };

  return (
    <div className="d-flex flex-row-reverse bd-highlight pe-3 ">
      <Button
        onClick={() => props.cleanSelectedFees()}
        className="btn btn-secondary m-1 p-1"
      >
        {studentsTranslation("students.studentCourseCard.paymentModal.clean")}
      </Button>
      <Button
        onClick={() => handleShow()}
        className=" btn btn-primary  m-1 p-1"
      >
        {studentsTranslation("students.studentCourseCard.paymentModal.review")}
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {studentsTranslation(
              "students.studentCourseCard.paymentModal.newPayment"
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column mb-3  text-center">
            <div className="d-inline-flex p-2">
              <div>
                <h6>
                  {studentsTranslation(
                    "students.studentCourseCard.paymentModal.amount"
                  )}
                </h6>
                <input
                  type="string"
                  name="amountToPay"
                  value={`$${props.totalToPay}`}
                  className="text-center"
                  disabled
                />
              </div>

              <div className="col-5 ps-4">
                <h6>
                  {studentsTranslation(
                    "students.studentCourseCard.paymentModal.paymentMethod"
                  )}
                </h6>
                <select
                  className="form-select"
                  onChange={(e) => {
                    setIncome({
                      ...income,
                      paymentMethodId: Number(e.target.value),
                    });
                    Number(e.target.value) !== 0
                      ? setSaveButtonEnabled(false)
                      : setSaveButtonEnabled(true);
                  }}
                >
                  <option value={0}></option>
                  {paymentMethods.map((paymentMethod) => (
                    <option key={paymentMethod.id} value={paymentMethod.id}>
                      {paymentMethod.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-sm-5">
              <h6>
                {studentsTranslation(
                  "students.studentCourseCard.paymentModal.incomeCategory"
                )}
              </h6>
              <input
                type="string"
                name="incomecategory"
                className="text-center"
                value="Cuotas"
                disabled
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            {studentsTranslation(
              "students.studentCourseCard.paymentModal.close"
            )}
          </Button>
          <Button
            onClick={() => inputsVerification()}
            className="btn btn-success"
            disabled={saveButtonEnabled}
          >
            {studentsTranslation("students.studentCourseCard.paymentModal.pay")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default PaymentModal;
