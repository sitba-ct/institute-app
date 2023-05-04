import { useState } from "react";
import { useTranslation } from "react-i18next";
import IStudentPeriodFeePayment from "../../../services/students/feePayment/IStudentPeriodFeePayment";
import IStudentDetail from "../../../services/students/studentDetail/IStudentDetail";
import PaymentModal from "../paymentModal/PaymentModal";
import CourseChangeModal from "./CourseChangeModal/CourseChangeModal";
import "./StudentCourseCard.scss";

type editProps = {
  studentDetail: IStudentDetail;
  setStudentAuxId: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedUnpayedFee: Function;
  selectedFutureFee: Function;
  amountToPay: number;
  selectedFee: IStudentPeriodFeePayment[];
  cleanSelectedFees: Function;
};

const StudentCourseCard = (props: editProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [studentsTranslation] = useTranslation("students");

  return (
    <div className="d-flex flex-row ">
      <div className="m-2 card px-1 border text-center">
        <h4>
          {props.studentDetail.student.name + " "}
          {props.studentDetail.student.surname}
        </h4>
        <div className="d-flex flex-row">
          <div className=" containerCourse me-3">
            <div
              className="courseButton "
              onClick={() => {
                setShowModal(true);
              }}
            >
              {props.studentDetail.student.courseId.name}
            </div>
            {showModal ? (
              <CourseChangeModal
                setShowModal={setShowModal}
                showModal={showModal}
                studentDetail={props.studentDetail}
                setStudentAuxId={props.setStudentAuxId}
              />
            ) : (
              <></>
            )}
          </div>
          <table className="table  text-center m-0 border border-light ">
            <thead></thead>
            <tbody>
              <tr>
                {props.studentDetail.lateEntryPeriods.map(
                  (entryLatePeriod, index) => {
                    return (
                      <td className="p-1" key={index}>
                        <b className=" border-m border-dark ">
                          {entryLatePeriod.coursePeriod.period}
                        </b>
                        <p className="bg-secondary border border-dark text-dark  d-flex p-1 buttonsFee ">
                          ${0}
                        </p>
                      </td>
                    );
                  }
                )}
                {props.studentDetail.payedPeriods.map((payedPeriod, index) => {
                  return (
                    <td className="p-1" key={index}>
                      <b className=" border-m border-dark  ">
                        {payedPeriod.coursePeriod.period}
                      </b>
                      <p
                        className="bg-success border border-dark text-dark  d-flex p-1 m-0"
                        title={payedPeriod.coursePeriod.courseId.name}
                      >
                        ${payedPeriod.coursePeriod.amountPay}
                      </p>
                      <p className="courseText">
                        {payedPeriod.coursePeriod.courseId.name}
                      </p>
                    </td>
                  );
                })}
                {props.studentDetail.unpayedPeriods.map(
                  (unpayedPeriod: IStudentPeriodFeePayment, index) => {
                    return (
                      <td className="p-1" key={index}>
                        <b className=" border-m border-dark  ">
                          {unpayedPeriod.coursePeriod.period}
                        </b>
                        <p
                          className={
                            unpayedPeriod.isSelected === true
                              ? " bg-success text-black  bg-opacity-50 border border-dark cursor border-2 d-flex p-1"
                              : props.studentDetail.unpayedPeriods[
                                  props.studentDetail.unpayedPeriods.length - 1
                                ].coursePeriod.id ===
                                unpayedPeriod.coursePeriod.id
                              ? " bg-warning border border-dark  cursor d-flex p-1 "
                              : " bg-danger border border-dark cursor d-flex p-1 "
                          }
                          onClick={() => {
                            props.selectedUnpayedFee(index);
                          }}
                        >
                          ${unpayedPeriod.coursePeriod.amountPay}
                        </p>
                      </td>
                    );
                  }
                )}
                {props.studentDetail.futurePeriods.map(
                  (futurePeriod: IStudentPeriodFeePayment, index) => {
                    return (
                      <td className="p-1" key={index}>
                        <b className=" border-m border-dark  ">
                          {futurePeriod.coursePeriod.period}
                        </b>
                        <p
                          className={
                            futurePeriod.isSelected === true
                              ? " bg-success p-1 text-black bg-opacity-50 border border-dark border border-2 cursor d-flex p-1"
                              : "bg-transparent border border-dark cursor d-flex p-1"
                          }
                          onClick={() => {
                            props.selectedFutureFee(index);
                          }}
                        >
                          ${futurePeriod.coursePeriod.amountPay}
                        </p>
                      </td>
                    );
                  }
                )}
              </tr>
            </tbody>
          </table>
          <h6 className="cuotasText">
            {studentsTranslation("students.studentCourseCard.fees")}
          </h6>
        </div>
      </div>
      <div
        className={props.amountToPay > 0 ? "card mt-1 pe-4 ps-4" : " hidden"}
      >
        <div className="text-center mt-1 ">
          <p className=" p-1 m-0 ">
            {studentsTranslation("students.finalPrice")}
          </p>
          <h5 className="border border-dark rounded mt-1 text-center">
            $ {props.amountToPay}
          </h5>

          <PaymentModal
            studentDetail={props.studentDetail}
            totalToPay={props.amountToPay}
            setStudentAuxId={props.setStudentAuxId}
            selectedFee={props.selectedFee}
            cleanSelectedFees={props.cleanSelectedFees}
          />
        </div>
      </div>
    </div>
  );
};
export default StudentCourseCard;
