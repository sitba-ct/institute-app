import IPeriod from "../../course/periods/ICoursePeriodsDetail";
import IIncome from "../../income/IIncome";

export default interface IStudentPeriodFeePayment {
  id: number | null;
  coursePeriod: IPeriod;
  income: IIncome | null;
  isSelected: Boolean;
}
