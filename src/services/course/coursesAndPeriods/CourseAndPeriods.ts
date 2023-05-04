import CoursePeriods from "../periods/CoursePeriods";
import ICoursePeriods from "../periods/ICoursePeriods";
import ICourseAndPeriods from "./ICourseAndPeriods";

export default class CourseAndPeriods implements ICourseAndPeriods {
  constructor(
    id: number = 0,
    name: string = "",
    duration: number = 0,
    startDate: Date = new Date(),
    initialFee: number = 0,
    coursePeriods: ICoursePeriods[] = [new CoursePeriods()]
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.startDate = startDate;
    this.initialFee = initialFee;
    this.coursePeriods = coursePeriods;
  }

  id: number;
  name: string;
  duration: number;
  startDate: Date;
  initialFee: number;
  coursePeriods: ICoursePeriods[];
}
