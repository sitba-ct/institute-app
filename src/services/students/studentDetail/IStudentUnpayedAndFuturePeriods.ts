import IStudentPeriodFeePayment from "../feePayment/IStudentPeriodFeePayment";

export default interface IUnpayedAndFuturePeriods {
  unpayedPeriods: IStudentPeriodFeePayment[];
  futurePeriods: IStudentPeriodFeePayment[];
}
