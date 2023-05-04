import ICoursePeriodsDetail from "../../course/periods/ICoursePeriodsDetail";
import IStudentPeriodFeePayment from "../feePayment/IStudentPeriodFeePayment";
import IStudentExpandid from "../IStudentExpandid";
import IStudentDetail from "./IStudentDetail";
import IUnpayedAndFuturePeriods from "./IStudentUnpayedAndFuturePeriods";

export default interface IStudentDetailService {
  processStudentDetail(
    student: IStudentExpandid,
    coursePeriods: ICoursePeriodsDetail[],
    periodAndFees: IStudentPeriodFeePayment[]
  ): Promise<IStudentDetail>;
  processStudentUnpayedAndFuturePeriods(
    studentId: number
  ): Promise<IUnpayedAndFuturePeriods>;
  processPayedPeriodsAndLateEntryPeriods(
    studentId: number
  ): Promise<IUnpayedAndFuturePeriods>;
  processStudentPeriodFeePayments(
    coursePeriods: ICoursePeriodsDetail[],
    periodAndFees: IStudentPeriodFeePayment[]
  ): IStudentPeriodFeePayment[];
  getCurrentPeriodLateDate(
    periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[]
  ): Number;
  getPeriods(courseId: number): Promise<ICoursePeriodsDetail[]>;
}
