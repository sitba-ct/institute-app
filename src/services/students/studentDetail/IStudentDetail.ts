import IStudentPeriodFeePayment from "../feePayment/IStudentPeriodFeePayment";
import IStudentExpandid from "../IStudentExpandid";

export default interface IStudentDetail {
  student: IStudentExpandid;
  periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[];
  unpayedPeriods: IStudentPeriodFeePayment[];
  futurePeriods: IStudentPeriodFeePayment[];
  payedPeriods: IStudentPeriodFeePayment[];
  lateEntryPeriods: IStudentPeriodFeePayment[];
  totalToPay: number;
}

export interface IStudentDetailFeesInfo {
  periodsWithPaymentsDebtsAndFees: IStudentPeriodFeePayment[];
  unpayedPeriods: IStudentPeriodFeePayment[];
  futurePeriods: IStudentPeriodFeePayment[];
  payedPeriods: IStudentPeriodFeePayment[];
  lateEntryPeriods: IStudentPeriodFeePayment[];
  totalToPay: number;
}
