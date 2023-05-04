import ICoursePeriods from "./ICoursePeriods";

export default class CoursePeriods implements ICoursePeriods {
  constructor(
    id: number = 0,
    courseId: number = 0,
    period: number = 0,
    periodMonths: number = 0,
    amountPay: number = 0,
    isSelected: boolean = false
  ) {
    this.id = id;
    this.courseId = courseId;
    this.period = period;
    this.periodMonths = periodMonths;
    this.amountPay = amountPay;
    this.isSelected = isSelected;
  }

  id: number;
  courseId: number;
  period: number;
  periodMonths: number;
  amountPay: number;
  isSelected: boolean;
}
