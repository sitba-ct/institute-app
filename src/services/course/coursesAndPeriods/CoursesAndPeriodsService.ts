import axios from "axios";
import ICourse from "../ICourse";
import CoursePeriods from "../periods/CoursePeriods";
import ICoursePeriods from "../periods/ICoursePeriods";
import CourseAndPeriods from "./CourseAndPeriods";
import ICourseAndPeriods from "./ICourseAndPeriods";
import ICoursesAndPeriodsService from "./ICoursesAndPeriodsService";
import { injectable } from "tsyringe";
import { container } from "tsyringe";

@injectable()
export class CoursesAndPeriodsService implements ICoursesAndPeriodsService {
  async coursesAndPeriods(
    courses: ICourse[],
    periods: ICoursePeriods[]
  ): Promise<ICourseAndPeriods[]> {
    let coursesAndPeriods: ICourseAndPeriods[] = [new CourseAndPeriods()];

    coursesAndPeriods = courses.map((course) => {
      let courseAndPeriods: ICourseAndPeriods =
        container.resolve(CourseAndPeriods);
      courseAndPeriods.id = course.id;
      courseAndPeriods.name = course.name;
      courseAndPeriods.initialFee = course.initialFee;
      courseAndPeriods.startDate = course.startDate;
      courseAndPeriods.duration = course.duration;
      courseAndPeriods.coursePeriods = periods
        .filter((period) => {
          return course.id === period.courseId;
        })
        .sort((a, b) => a.period - b.period);
      return courseAndPeriods;
    });
    return coursesAndPeriods;
  }

  async getPeriods(courseId: number): Promise<CoursePeriods[]> {
    let response = await axios
      .get("/rest/v1/coursePeriodo?select=*&courseId=eq." + courseId)
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async getAllPeriods(): Promise<CoursePeriods[]> {
    let response = await axios
      .get("/rest/v1/coursePeriodo?select=*")
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
}
