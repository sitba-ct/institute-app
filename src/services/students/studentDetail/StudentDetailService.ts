import axios from "axios";
import ICoursePeriodsDetail from "../../course/periods/ICoursePeriodsDetail";
import IStudentPeriodFeePayment from "../feePayment/IStudentPeriodFeePayment";
import StudentPeriodFeePayment from "../feePayment/StudentPeriodFeePayment";
import IStudentExpandid from "../IStudentExpandid";
import { StudentService } from "../StudentService";
import IBasicDataStudentDetail from "./IBasicDataStudentDetail";
import IStudentDetail from "./IStudentDetail";
import IStudentDetailService from "./IStudentDetailService";
import IUnpayedAndFuturePeriods from "./IStudentUnpayedAndFuturePeriods";
import StudentDetail from "./StudentDetail";
import UnpayedAndFuturePeriods from "./StudentUnpayedAndFuturePeriods";
import { injectable } from "tsyringe";
import { container } from "tsyringe";

@injectable()
export class StudentDetailService implements IStudentDetailService {
  async processStudentDetail(
    student: IStudentExpandid,
    coursePeriods: ICoursePeriodsDetail[],
    periodAndFees: IStudentPeriodFeePayment[]
  ): Promise<IStudentDetail> {
    let periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[] =
      this.processStudentPeriodFeePayments(coursePeriods, periodAndFees);

    let currentPeriod: number = this.getCurrentPeriodLateDate(
      periodsWithPaymentsDebtsAndFees
    );

    let unpayedPeriods: IStudentPeriodFeePayment[] = this.processUnpayedPeriods(
      periodsWithPaymentsDebtsAndFees,
      currentPeriod,
      student
    );
    let futurePeriods: IStudentPeriodFeePayment[] = this.processFuturePeriods(
      periodsWithPaymentsDebtsAndFees,
      currentPeriod,
      student
    );

    let payedPeriods: IStudentPeriodFeePayment[] = this.processPayedPeriods(
      periodsWithPaymentsDebtsAndFees
    );
    let lateEntryPeriods: IStudentPeriodFeePayment[] =
      this.processLateEntryPeriods(periodsWithPaymentsDebtsAndFees, student);

    let totalToPay: number = this.processTotalToPay(unpayedPeriods);

    let studentDetail: IStudentDetail = new StudentDetail(
      periodsWithPaymentsDebtsAndFees,
      student,
      totalToPay,
      unpayedPeriods,
      futurePeriods,
      payedPeriods,
      lateEntryPeriods
    );
    return studentDetail;
  }

  async processStudentUnpayedAndFuturePeriods(
    studentId: number
  ): Promise<IUnpayedAndFuturePeriods> {
    let basicDataStudentDetail = this.getBasicDataStudentDetail(studentId);

    let periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[] =
      this.processStudentPeriodFeePayments(
        (await basicDataStudentDetail).coursePeriods,
        (await basicDataStudentDetail).periodAndFees
      );

    let currentPeriod: number = this.getCurrentPeriodLateDate(
      periodsWithPaymentsDebtsAndFees
    );

    let unpayedPeriods: IStudentPeriodFeePayment[] = this.processUnpayedPeriods(
      periodsWithPaymentsDebtsAndFees,
      currentPeriod,
      (await basicDataStudentDetail).student
    );
    let futurePeriods: IStudentPeriodFeePayment[] = this.processFuturePeriods(
      periodsWithPaymentsDebtsAndFees,
      currentPeriod,
      (await basicDataStudentDetail).student
    );

    let unpayedAndFuturePeriods: IUnpayedAndFuturePeriods =
      new UnpayedAndFuturePeriods(unpayedPeriods, futurePeriods);
    return unpayedAndFuturePeriods;
  }

  async processPayedPeriodsAndLateEntryPeriods(
    studentId: number
  ): Promise<IUnpayedAndFuturePeriods> {
    let basicDataStudentDetail = this.getBasicDataStudentDetail(studentId);

    let periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[] =
      this.processStudentPeriodFeePayments(
        (await basicDataStudentDetail).coursePeriods,
        (await basicDataStudentDetail).periodAndFees
      );

    let currentPeriod: Number = this.getCurrentPeriodLateDate(
      periodsWithPaymentsDebtsAndFees
    );

    let unpayedPeriods: IStudentPeriodFeePayment[] = this.processPayedPeriods(
      periodsWithPaymentsDebtsAndFees
    );
    let futurePeriods: IStudentPeriodFeePayment[] =
      this.processLateEntryPeriods(
        periodsWithPaymentsDebtsAndFees,
        (await basicDataStudentDetail).student
      );

    let unpayedAndFuturePeriods: IUnpayedAndFuturePeriods =
      new UnpayedAndFuturePeriods(unpayedPeriods, futurePeriods);
    return unpayedAndFuturePeriods;
  }

  processStudentPeriodFeePayments(
    coursePeriods: ICoursePeriodsDetail[],
    periodAndFees: IStudentPeriodFeePayment[]
  ): IStudentPeriodFeePayment[] {
    let studentPeriodFeePayments: IStudentPeriodFeePayment[] =
      coursePeriods.map((coursePeriod) => {
        let periodAndFeesResult = periodAndFees.filter(
          (periodAndFees) =>
            coursePeriod.period === periodAndFees.coursePeriod.period
        );
        let existingPeriod = periodAndFeesResult[0];
        let periodAndFee: IStudentPeriodFeePayment;
        if (existingPeriod === undefined) {
          periodAndFee = new StudentPeriodFeePayment(null, coursePeriod, null);
        } else {
          periodAndFee = existingPeriod;
        }
        return periodAndFee;
      });
    let periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[] =
      studentPeriodFeePayments.sort(
        (a, b) => a.coursePeriod.period - b.coursePeriod.period
      );
    return periodsWithPaymentsDebtsAndFees;
  }

  getCurrentPeriodLateDate(
    periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[]
  ): number {
    let addADay =
      new Date(
        periodsWithPaymentsDebtsAndFees[0].coursePeriod.courseId.startDate
      ).getTime() + 86400000;
    let currentPeriod: number = this.processCurrentPeriod(new Date(addADay));
    return currentPeriod;
  }

  processCurrentPeriod = (startDate: Date): number => {
    let currentDate: number = 0;
    const todayDate = new Date(Date());
    let month = todayDate.getMonth();
    currentDate = month + 1 - startDate.getMonth();
    return currentDate;
  };

  async getPeriods(courseId: number): Promise<ICoursePeriodsDetail[]> {
    let response = await axios
      .get(
        "/rest/v1/coursePeriodo?select=*&courseId(*)&courseId=eq." + courseId
      )
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }

  processPayedPeriods = (
    periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[]
  ): IStudentPeriodFeePayment[] => {
    let payedPeriods = periodsWithPaymentsDebtsAndFees.filter(
      (periodsWithPaymentsDebtsAndFees) => {
        return periodsWithPaymentsDebtsAndFees.id !== null;
      }
    );
    return payedPeriods;
  };
  processUnpayedPeriods = (
    periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[],
    currentDate: number,
    student: IStudentExpandid
  ): IStudentPeriodFeePayment[] => {
    let unpayedPeriods = periodsWithPaymentsDebtsAndFees.filter(
      (periodsWithPaymentsDebtsAndFees) => {
        return (
          currentDate >= periodsWithPaymentsDebtsAndFees.coursePeriod.period &&
          periodsWithPaymentsDebtsAndFees.id === null &&
          new Date(student.courseStartedDate).getMonth() <=
            periodsWithPaymentsDebtsAndFees.coursePeriod.period
        );
      }
    );
    return unpayedPeriods;
  };

  processFuturePeriods = (
    periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[],
    currentDate: number,
    student: IStudentExpandid
  ): IStudentPeriodFeePayment[] => {
    let getFuturePeriods = periodsWithPaymentsDebtsAndFees.filter(
      (periodsWithPaymentsDebtsAndFees) =>
        currentDate < periodsWithPaymentsDebtsAndFees.coursePeriod.period &&
        periodsWithPaymentsDebtsAndFees.id === null &&
        new Date(student.courseStartedDate).getMonth() <=
          periodsWithPaymentsDebtsAndFees.coursePeriod.period
    );
    return getFuturePeriods;
  };
  processLateEntryPeriods = (
    periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[],
    student: IStudentExpandid
  ): IStudentPeriodFeePayment[] => {
    let getLateEntryPeriods = periodsWithPaymentsDebtsAndFees.filter(
      (periodsWithPaymentsDebtsAndFees) =>
        new Date(student.courseStartedDate).getMonth() >
          periodsWithPaymentsDebtsAndFees.coursePeriod.period &&
        periodsWithPaymentsDebtsAndFees.id === null
    );
    return getLateEntryPeriods;
  };
  processTotalToPay = (
    periodsWithDebts: IStudentPeriodFeePayment[]
  ): number => {
    let debtCounter = 0;
    periodsWithDebts.forEach(
      (periodsWithDebts) =>
        (debtCounter += periodsWithDebts.coursePeriod.amountPay)
    );
    return debtCounter;
  };

  getBasicDataStudentDetail = async (
    studentId: number
  ): Promise<IBasicDataStudentDetail> => {
    const studentService = container.resolve(StudentService);

    let student: IStudentExpandid = await studentService.searchStudent(
      Number(studentId)
    );
    let coursePeriods: ICoursePeriodsDetail[] = await this.getPeriods(
      student.courseId.id
    );
    let periodAndFees: IStudentPeriodFeePayment[] =
      await studentService.getCoursePeriodAndIncome(student.id);
    return { student, coursePeriods, periodAndFees };
  };

  selectedUnpayedFee = (
    index: number,
    studentDetail: IStudentDetail
  ): IStudentDetail => {
    let studentDetailAux: IStudentDetail = studentDetail;
    studentDetailAux.unpayedPeriods[index].isSelected === false
      ? (studentDetailAux.unpayedPeriods[index].isSelected = true)
      : (studentDetailAux.unpayedPeriods[index].isSelected = false);
    return studentDetailAux;
  };

  selectedFutureFee = (
    index: number,
    studentDetail: IStudentDetail
  ): IStudentDetail => {
    let studentDetailAux: IStudentDetail = studentDetail;
    studentDetailAux.futurePeriods[index].isSelected === false
      ? (studentDetailAux.futurePeriods[index].isSelected = true)
      : (studentDetailAux.futurePeriods[index].isSelected = false);
    return studentDetailAux;
  };
}
