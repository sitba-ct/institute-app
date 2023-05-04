import IPeriod from "../../course/periods/ICoursePeriodsDetail";
import Periods from "../../course/periods/CoursePeriodsDetail";
import IIncome from "../../income/IIncome";
import Income from "../../income/Income";
import IStudentPeriodFeePayment from "./IStudentPeriodFeePayment";

export default class StudentPeriodFeePayment
  implements IStudentPeriodFeePayment
{
  constructor(
    id: number | null = 0,
    coursePeriod: IPeriod = new Periods(),
    income: IIncome | null = new Income(),
    isSelected: Boolean = false
  ) {
    this.id = id;
    this.coursePeriod = coursePeriod;
    this.income = income;
    this.isSelected = isSelected;
  }

  id: number | null;
  coursePeriod: IPeriod;
  income: IIncome | null;
  isSelected: Boolean;
}
