import ICourseError from "./ICourseError";

export default class CourseError implements ICourseError {
  constructor(
    id: string | undefined = "",
    name: string | undefined = undefined,
    duration: string | undefined = "",
    startDate: string | undefined = undefined,
    initialFee: string | undefined = undefined
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.startDate = startDate;
    this.initialFee = initialFee;
  }

  id: string | undefined;
  name: string | undefined;
  duration: string | undefined;
  startDate: string | undefined;
  initialFee: string | undefined;
}
