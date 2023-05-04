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
  studentsDetail: IStudentDetail[];
  totalToPay: number;
  setGroupIdAux: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedFee: IStudentPeriodFeePayment[];
  groupDiscount: number;
  cleanSelectedFees: Function;
};

const PaymentModalGroup = (props: variables) => {
  const studentService = container.resolve(StudentService);
  const studentValidationService = container.resolve(StudentValidationService);
  const incomeService = container.resolve(IncomeService);
  const paymentsService = container.resolve(PaymentsService);

  const [studentsTranslation] = useTranslation("students");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorRedMessage, setErrorRedMessage] = useState<boolean>(true);

  const [income, setIncome] = useState<IIncome>(new Income());

  const [paymentMethods, setPaymentMethod] = useState<IPaymentMethod[]>([
    new PaymentMethod(),
  ]);

  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(true);

  useEffect(() => {
    initIncomeCategory();
    initpaymentMethod();
  }, []);

  const initIncomeCategory = async () => {
    let IncomeCategorysList = await incomeService.getIncomeCategorysList();
    let courseCategory = IncomeCategorysList.find(
      (category) => category.name === "Cuotas"
    );
    courseCategory !== undefined
      ? setIncome({
          ...income,
          incomeCategoryId: Number(courseCategory.id),
        })
      : console.error();
  };

  const initpaymentMethod = async () => {
    let paymentMethodsList = await incomeService.getPaymentMethodsList();
    setPaymentMethod(paymentMethodsList);
  };

  const addStudentPayment = async () => {
    let newIncome: IIncome = await studentService.addIncome(
      income,
      props.totalToPay
    );

    props.studentsDetail.map(async (student) => {
      await paymentsService.addStudentPaidPeriods(
        student.student.id,
        newIncome.id,
        props.selectedFee,
        student.student.courseId.id
      );
      props.setGroupIdAux(student.student.id);
    });

    setShowModal(false);
    setErrorRedMessage(true);
  };

  const inputsVerification = () => {
    studentValidationService.isPaymentValid(income, props.totalToPay)
      ? addStudentPayment()
      : setErrorRedMessage(false);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
    setErrorRedMessage(true);
    setSaveButtonEnabled(true);
  };

  return (
    <div>
      <Button onClick={() => handleShow()} className="btn btn-primary  m-1 p-1">
        {studentsTranslation(
          "students.groupCourseDetails.paymentModalGroup.review"
        )}
      </Button>
      <Button
        onClick={() => props.cleanSelectedFees()}
        className="btn btn-secondary m-1 p-1"
      >
        {studentsTranslation(
          "students.groupCourseDetails.paymentModalGroup.clean"
        )}
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {studentsTranslation(
              "students.groupCourseDetails.paymentModalGroup.newPayment"
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Form className="d-flex flex-column mb-3  text-center">
            <div className="d-inline-flex p-2">
              <div>
                <h6>
                  {studentsTranslation(
                    "students.groupCourseDetails.paymentModalGroup.amountWith:"
                  )}
                  {props.groupDiscount * 100}
                  {studentsTranslation(
                    "students.groupCourseDetails.paymentModalGroup.discount"
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
            <div>
              <h6>
                {studentsTranslation(
                  "students.groupCourseDetails.paymentModalGroup.incomeCategory"
                )}
              </h6>
              <input
                type="string"
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
              "students.groupCourseDetails.paymentModalGroup.close"
            )}
          </Button>
          <Button
            onClick={() => inputsVerification()}
            className="btn btn-success"
            disabled={saveButtonEnabled}
          >
            {studentsTranslation(
              "students.groupCourseDetails.paymentModalGroup.pay"
            )}
          </Button>
        </Modal.Footer>
        {errorRedMessage === true ? (
          <></>
        ) : (
          <h5 className="text-danger text-center">
            {studentsTranslation(
              "students.groupCourseDetails.paymentModalGroup.youHaveIncompleteFiels"
            )}
          </h5>
        )}
      </Modal>
    </div>
  );
};
export default PaymentModalGroup;
