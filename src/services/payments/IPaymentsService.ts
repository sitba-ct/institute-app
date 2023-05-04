import IStudentPeriodFeePayment from "../students/feePayment/IStudentPeriodFeePayment";

export default interface IPaymentsService {
  addStudentPaidPeriods(
    studentId: number,
    incomeId: number,
    periodsToPay: IStudentPeriodFeePayment[],
    studentCourseId: number
  ): void;
}
