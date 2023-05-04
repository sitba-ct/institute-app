import ICourse from "../ICourse";

export default interface ICoursePeriodsDetail {
  id: number;
  courseId: ICourse;
  period: number;
  periodMonths: number;
  amountPay: number;
}
