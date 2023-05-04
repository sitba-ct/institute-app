import IStudentPeriodFeePayment from "../feePayment/IStudentPeriodFeePayment";
import StudentPeriodFeePayment from "../feePayment/StudentPeriodFeePayment";
import IUnpayedAndFuturePeriods from "./IStudentUnpayedAndFuturePeriods";

export default class UnpayedAndFuturePeriods
  implements IUnpayedAndFuturePeriods
{
  constructor(
    unpayedPeriods: IStudentPeriodFeePayment[] = [
      new StudentPeriodFeePayment(),
    ],
    futurePeriods: IStudentPeriodFeePayment[] = [new StudentPeriodFeePayment()]
  ) {
    this.unpayedPeriods = unpayedPeriods;
    this.futurePeriods = futurePeriods;
  }

  unpayedPeriods: IStudentPeriodFeePayment[];
  futurePeriods: IStudentPeriodFeePayment[];
}
