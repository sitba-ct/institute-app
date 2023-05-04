import Course from "../Course";
import type ICourse from "../ICourse";
import ICoursePeriodsDetail from "./ICoursePeriodsDetail";

export default class CoursePeriodsDetail implements ICoursePeriodsDetail {
  constructor(
    id: number = 0,
    courseId: ICourse = new Course(),
    period: number = 0,
    periodMonths: number = 0,
    amountPay: number = 0
  ) {
    this.id = id;
    this.courseId = courseId;
    this.period = period;
    this.periodMonths = periodMonths;
    this.amountPay = amountPay;
  }

  id: number;
  courseId: ICourse;
  period: number;
  periodMonths: number;
  amountPay: number;
}
