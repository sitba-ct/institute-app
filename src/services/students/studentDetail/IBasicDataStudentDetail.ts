import ICoursePeriodsDetail from "../../course/periods/ICoursePeriodsDetail";
import IStudentPeriodFeePayment from "../feePayment/IStudentPeriodFeePayment";
import IStudentExpandid from "../IStudentExpandid";

export default interface IBasicDataStudentDetail {
  student: IStudentExpandid;
  coursePeriods: ICoursePeriodsDetail[];
  periodAndFees: IStudentPeriodFeePayment[];
}
