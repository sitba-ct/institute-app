import IStudentPeriodFeePayment from "./IStudentPeriodFeePayment";
import IStudentPeriodFeePaymentResponse from "./IStudentPeriodFeePaymentResponse";

export default class StudentPeriodFeePaymentResponse
  implements IStudentPeriodFeePaymentResponse
{
  constructor(studentPeriodFeePayment: IStudentPeriodFeePayment[]) {
    this.studentPeriodFeePayment = studentPeriodFeePayment;
  }

  studentPeriodFeePayment: IStudentPeriodFeePayment[];
}
