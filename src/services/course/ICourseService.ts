import ICourse from "./ICourse";

export default interface ICourseService {
  getCourseList(): Promise<ICourse[]>;
  AddCourse(
    name: string,
    startDate: Date,
    initialFee: number
  ): Promise<ICourse>;
  EditCourse(
    name: string,
    startDate: Date,
    initialFee: number,
    id: number
  ): Promise<ICourse>;
  getCourse(courseId: number): Promise<ICourse>;
  addCoursePeriod(amountPay: number, courseId: number): any;
}