import IStudentPeriodFeePayment from "../feePayment/IStudentPeriodFeePayment";
import StudentPeriodFeePayment from "../feePayment/StudentPeriodFeePayment";
import IStudentExpandid from "../IStudentExpandid";
import StudentExpandid from "../StudentExpandid";
import IStudentDetail from "./IStudentDetail";

export default class StudentDetail implements IStudentDetail {
  constructor(
    periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[] = [
      new StudentPeriodFeePayment(),
    ],
    student: IStudentExpandid = new StudentExpandid(),
    totalToPay: number = 0,
    unpayedPeriods: IStudentPeriodFeePayment[] = [
      new StudentPeriodFeePayment(),
    ],
    futurePeriods: IStudentPeriodFeePayment[] = [new StudentPeriodFeePayment()],
    payedPeriods: IStudentPeriodFeePayment[] = [new StudentPeriodFeePayment()],
    lateEntryPeriods: IStudentPeriodFeePayment[] = [
      new StudentPeriodFeePayment(),
    ]
  ) {
    this.periodsWithPaymentsDebtsAndFees = periodsWithPaymentsDebtsAndFees;
    this.student = student;
    this.totalToPay = totalToPay;
    this.unpayedPeriods = unpayedPeriods;
    this.futurePeriods = futurePeriods;
    this.payedPeriods = payedPeriods;
    this.lateEntryPeriods = lateEntryPeriods;
  }

  periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[];
  student: IStudentExpandid;
  totalToPay: number;
  unpayedPeriods: IStudentPeriodFeePayment[];
  futurePeriods: IStudentPeriodFeePayment[];
  payedPeriods: IStudentPeriodFeePayment[];
  lateEntryPeriods: IStudentPeriodFeePayment[];
}
