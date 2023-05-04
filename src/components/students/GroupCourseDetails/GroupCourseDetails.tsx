import IStudentSelected from "../../../services/students/selectedStudentInfo/ISelectedStudentInfo";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StudentService } from "../../../services/students/StudentService";
import IStudentDetail from "../../../services/students/studentDetail/IStudentDetail";
import { StudentDetailService } from "../../../services/students/studentDetail/StudentDetailService";
import PaymentModalGroup from "../paymentModalGroup/PaymentModalGroup";
import StudentCourseCard from "../StudentCourseCard/StudentCourseCard";
import IStudentPeriodFeePayment from "../../../services/students/feePayment/IStudentPeriodFeePayment";
import { GroupService } from "../../../services/group/GroupService";
import FeeReferenceTable from "../StudentCourseCard/FeeReferenceTable";
import IDiscount from "../../../services/group/IDiscount";
import { useTranslation } from "react-i18next";
import IBasicDataStudentDetail from "../../../services/students/studentDetail/IBasicDataStudentDetail";
import { container } from "tsyringe";

const GroupCourseDetails = () => {
  const studentService = container.resolve(StudentService);
  const studentDetailService = container.resolve(StudentDetailService);

  const { groupId } = useParams();

  const [groupIdAux, setGroupIdAux] = useState<number>();

  const [studentsTranslation] = useTranslation("students");

  const [students, setStudents] = useState<IStudentSelected[]>([]);

  const [studentsDetail, setStudentsDetail] = useState<IStudentDetail[]>([]);

  const [groupDiscount, setGroupDiscount] = useState<number>(0);

  const [isPaymentCompleted, setIsPaymentCompleted] = useState<boolean>(false);

  const [totalToPayGroup, setTotalToPayGroup] = useState<number>(0);
  const [totalToPayWithDiscount, setTotalToPayWithDiscount] =
    useState<number>(0);

  const amountToPay = -1;
  const [selectedFee, setSelectedFee] = useState<IStudentPeriodFeePayment[]>(
    []
  );

  useEffect(() => {
    if (Number(groupId) !== 0 && Number(groupId) !== undefined) {
      setGroupIdAux(Number(groupId));
    }
  }, [groupId, groupIdAux]);

  useEffect(() => {
    if (Number(groupIdAux) !== 0 && groupIdAux !== undefined) {
      studentService.searchGroup(Number(groupIdAux)).then((students) => {
        setStudents(students);
      });
    }
  }, [groupIdAux]);

  useEffect(() => {
    let getBasicDataStudentDetail = async () => {
      let basicDataStudentDetail: Promise<IBasicDataStudentDetail>[];
      basicDataStudentDetail = students.map(async (studentMap) => {
        let student = await studentService.searchStudent(Number(studentMap.id));
        let coursePeriods = await studentDetailService.getPeriods(
          student.courseId.id
        );
        let periodAndFees = await studentService.getCoursePeriodAndIncome(
          student.id
        );

        return { student, coursePeriods, periodAndFees };
      });
      getStudentsDetail(basicDataStudentDetail);
    };
    getBasicDataStudentDetail();
  }, [students]);

  let getStudentsDetail = async (
    basicDataStudentDetail: Promise<IBasicDataStudentDetail>[]
  ) => {
    const studentDetailService = container.resolve(StudentDetailService);
    let studentsPaymentDetails: IStudentDetail[] = [];
    const refreshStudentDetails = async () => {
      studentsPaymentDetails = await Promise.all(
        basicDataStudentDetail.map(async (basicData) => {
          return studentDetailService.processStudentDetail(
            (await basicData).student,
            (await basicData).coursePeriods,
            (await basicData).periodAndFees
          );
        })
      );
      setStudentsDetail(studentsPaymentDetails);
    };
    refreshStudentDetails();
  };

  useEffect(() => {
    if (studentsDetail && studentsDetail.length > 0) {
      updateAmountToPay();
      updateSelectedFee();
      updateDiscountGroup(students.length);
      hideStudentCardWithPaymentCompleted(studentsDetail[0]);
    }
  }, [studentsDetail]);

  let selectedUnpayedFee = (index: number) => {
    let studentsDetailAux: IStudentDetail[] = studentsDetail.map(
      (studentDetail) => {
        studentDetailService.selectedUnpayedFee(index, studentDetail);
        return studentDetail;
      }
    );
    setStudentsDetail(studentsDetailAux);
  };
  let selectedFutureFee = (index: number) => {
    let studentsDetailAux: IStudentDetail[] = studentsDetail.map(
      (studentDetail) => {
        studentDetailService.selectedFutureFee(index, studentDetail);
        return studentDetail;
      }
    );
    setStudentsDetail(studentsDetailAux);
  };

  let updateSelectedFee = () => {
    studentsDetail.forEach((studentDetail) => {
      let selectedUnpayedPeriods: IStudentPeriodFeePayment[] =
        studentDetail.unpayedPeriods.filter(
          (period) => period.isSelected === true
        );
      let selectedfuturePeriods: IStudentPeriodFeePayment[] =
        studentDetail.futurePeriods.filter(
          (period) => period.isSelected === true
        );
      setSelectedFee(selectedUnpayedPeriods.concat(selectedfuturePeriods));
    });
  };

  let updateAmountToPay = () => {
    let amountToPay: number = 0;
    studentsDetail.forEach((studentDetail) => {
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
    });

    setTotalToPayGroup(amountToPay);
    setTotalToPayWithDiscount(amountToPay - amountToPay * groupDiscount);
  };

  const updateDiscountGroup = async (studentsAmount: number) => {
    const groupService = container.resolve(GroupService);

    let discount: IDiscount =
      await groupService.GetDiscountByAmountOfIntegrants(studentsAmount);
    setGroupDiscount(discount.discountRate);
  };

  const cleanSelectedFees = async () => {
    let cleanStudentsDetail: IStudentDetail[] = studentsDetail.map(
      (studentDetail) => {
        studentDetail.unpayedPeriods.forEach((unpayedPeriod) => {
          unpayedPeriod.isSelected = false;
        });
        studentDetail.futurePeriods.forEach((futurePeriod) => {
          futurePeriod.isSelected = false;
        });
        return studentDetail;
      }
    );
    setStudentsDetail(cleanStudentsDetail);
  };

  let hideStudentCardWithPaymentCompleted = (studentDetail: IStudentDetail) => {
    studentDetail.payedPeriods.length === 9
      ? setIsPaymentCompleted(true)
      : setIsPaymentCompleted(false);
  };

  return (
    <div className="d-flex flex-column ">
      {isPaymentCompleted === false ? (
        <p className=" text-secondary ms-2 my-0 py-0  ">
          {studentsTranslation(
            "students.groupCourseDetails.selectPeriodsToPay"
          )}
        </p>
      ) : (
        <></>
      )}
      <p className=" text-secondary ms-2 my-0 py-0  ">
        {studentsTranslation(
          "students.groupCourseDetails.selectCourseToChangeIt"
        )}
      </p>
      <div className="d-flex flex-row mb-2">
        <div>
          {studentsDetail.length > 0 ? (
            studentsDetail.map((studentsDetails, index) => {
              return (
                <div key={index}>
                  <StudentCourseCard
                    studentDetail={studentsDetails}
                    setStudentAuxId={setGroupIdAux}
                    selectedUnpayedFee={selectedUnpayedFee}
                    selectedFutureFee={selectedFutureFee}
                    amountToPay={amountToPay}
                    selectedFee={selectedFee}
                    cleanSelectedFees={cleanSelectedFees}
                  />
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div className="d-flex align-items-end flex-column  ">
          <div className="row align-self-center ">
            <div
              className={
                totalToPayGroup > 0
                  ? "align-items-center border border border-black border-opacity-20 rounded  "
                  : " hidden"
              }
            >
              <div className=" text-center ">
                <p className="m-0">
                  Total: <b className=" ">${totalToPayGroup}</b>
                </p>
                <p className="m-0">
                  {studentsDetail.length}
                  {studentsTranslation("students.groupCourseDetails.persons")}
                  <b className=" "> -{groupDiscount * 100}%</b>
                </p>
                <p className=" pt-1  ">
                  {studentsTranslation(
                    "students.groupCourseDetails.finalPrice"
                  )}
                </p>
                <h5 className="border border-dark rounded ">
                  ${totalToPayWithDiscount}
                </h5>
                <PaymentModalGroup
                  studentsDetail={studentsDetail}
                  totalToPay={totalToPayWithDiscount}
                  setGroupIdAux={setGroupIdAux}
                  selectedFee={selectedFee}
                  groupDiscount={groupDiscount}
                  cleanSelectedFees={cleanSelectedFees}
                />
              </div>
            </div>
          </div>
          <div className="mt-auto ">
            <FeeReferenceTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCourseDetails;
