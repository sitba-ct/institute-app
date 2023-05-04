import ICourse from "../ICourse";
import CoursePeriods from "../periods/CoursePeriods";
import ICoursePeriods from "../periods/ICoursePeriods";
import ICourseAndPeriods from "./ICourseAndPeriods";

export default interface ICoursesAndPeriodsService {
  coursesAndPeriods(
    courses: ICourse[],
    periods: ICoursePeriods[]
  ): Promise<ICourseAndPeriods[]>;
  getPeriods(courseId: number): Promise<CoursePeriods[]>;
  getAllPeriods(): Promise<CoursePeriods[]>;
}
