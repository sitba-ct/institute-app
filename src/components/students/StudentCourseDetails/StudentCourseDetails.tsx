import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentCourseCard from "../StudentCourseCard/StudentCourseCard";
import { StudentDetailService } from "../../../services/students/studentDetail/StudentDetailService";
import IStudentDetail from "../../../services/students/studentDetail/IStudentDetail";
import IStudentPeriodFeePayment from "../../../services/students/feePayment/IStudentPeriodFeePayment";
import StudentDetail from "../../../services/students/studentDetail/StudentDetail";
import FeeReferenceTable from "../StudentCourseCard/FeeReferenceTable";
import IStudentExpandid from "../../../services/students/IStudentExpandid";
import ICoursePeriodsDetail from "../../../services/course/periods/ICoursePeriodsDetail";
import { container } from "tsyringe";

const StudentCourseDetails = () => {
  const studentDetailService = container.resolve(StudentDetailService);

  const { studentId } = useParams();
  const [studentDetail, setStudentDetail] = useState<IStudentDetail>(
    new StudentDetail()
  );
  const [studentAuxId, setStudentAuxId] = useState<number>();

  const [isPaymentCompleted, setIsPaymentCompleted] = useState<boolean>(false);

  const [amountToPay, setAmountToPay] = useState<number>(0);
  const [selectedFee, setSelectedFee] = useState<IStudentPeriodFeePayment[]>(
    []
  );

  useEffect(() => {
    if (Number(studentId) !== 0 && Number(studentId) !== undefined) {
      setStudentAuxId(Number(studentId));
      setAmountToPay(-1);
    }
  }, [studentId, studentAuxId]);

  useEffect(() => {
    if (Number(studentAuxId) !== 0 && studentAuxId !== undefined) {
      let getBasicData = async () => {
        let basicDataStudentDetail =
          studentDetailService.getBasicDataStudentDetail(Number(studentId));
        getStudentDetail(
          (await basicDataStudentDetail).student,
          (await basicDataStudentDetail).coursePeriods,
          (await basicDataStudentDetail).periodAndFees
        );
      };
      getBasicData();
    }
  }, [studentAuxId]);

  let getStudentDetail = (
    student: IStudentExpandid,
    coursePeriods: ICoursePeriodsDetail[],
    periodAndFees: IStudentPeriodFeePayment[]
  ) => {
    studentDetailService
      .processStudentDetail(student, coursePeriods, periodAndFees)
      .then((studentDetail) => {
        setStudentDetail(studentDetail);
        hideStudentCardWithPaymentCompleted(studentDetail);
      });
  };

  let selectedUnpayedFee = (index: number) => {
    let studentDetailAux: IStudentDetail =
      studentDetailService.selectedUnpayedFee(index, studentDetail);
    setStudentDetail(studentDetailAux);
    updateAmountToPay();
    updateSelectedFee();
  };
  let selectedFutureFee = (index: number) => {
    let studentDetailAux: IStudentDetail =
      studentDetailService.selectedFutureFee(index, studentDetail);
    setStudentDetail(studentDetailAux);
    updateAmountToPay();
    updateSelectedFee();
  };

  let updateSelectedFee = () => {
    let selectedUnpayedPeriods: IStudentPeriodFeePayment[] =
      studentDetail.unpayedPeriods.filter(
        (period) => period.isSelected === true
      );
    let selectedfuturePeriods: IStudentPeriodFeePayment[] =
      studentDetail.futurePeriods.filter(
        (period) => period.isSelected === true
      );
    setSelectedFee(selectedUnpayedPeriods.concat(selectedfuturePeriods));
  };

  let updateAmountToPay = () => {
    let amountToPay: number = 0;
    studentDetail.unpayedPeriods.forEach((period) =>
      period.isSelected === true
        ? (amountToPay += period.coursePeriod.amountPay)
        : 0
    );
    studentDetail.futurePeriods.forEach((period) =>
      period.isSelected === true
        ? (amountToPay += period.coursePeriod.amountPay)
        : 0
    );
    setAmountToPay(amountToPay);
  };
  const cleanSelectedFees = async () => {
    let cleanStudentsDetail: IStudentDetail = studentDetail;

    studentDetail.unpayedPeriods.forEach((unpayedPeriod) => {
      unpayedPeriod.isSelected = false;
    });
    studentDetail.futurePeriods.forEach((futurePeriod) => {
      futurePeriod.isSelected = false;
    });

    setStudentDetail(cleanStudentsDetail);
    updateAmountToPay();
    updateSelectedFee();
  };

  let hideStudentCardWithPaymentCompleted = (studentDetail: IStudentDetail) => {
    studentDetail.payedPeriods.length === 9
      ? setIsPaymentCompleted(true)
      : setIsPaymentCompleted(false);
  };

  return (
    <div className="d-flex flex-column mb-3 ">
      {isPaymentCompleted === false ? (
        <p className=" text-secondary ms-2 my-0 py-0  ">
          Select periods to pay
        </p>
      ) : (
        <></>
      )}
      <p className=" text-secondary ms-2 my-0 py-0  ">
        Select course to change it
      </p>
      <div className="d-flex flex-row mb-2">
        <div className="d-flex flex-column mb-3">
          {studentDetail !== undefined &&
          studentDetail.student.courseId.name !== "" ? (
            <StudentCourseCard
              studentDetail={studentDetail}
              setStudentAuxId={setStudentAuxId}
              selectedUnpayedFee={selectedUnpayedFee}
              selectedFutureFee={selectedFutureFee}
              amountToPay={amountToPay}
              selectedFee={selectedFee}
              cleanSelectedFees={cleanSelectedFees}
            />
          ) : (
            <></>
          )}
          <div className="d-flex flex-row-reverse">
            <FeeReferenceTable />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentCourseDetails;
