import ICoursePeriods from "../periods/ICoursePeriods";

export default interface ICourseAndPeriods {
  id: number;
  name: string;
  duration: number;
  startDate: Date;
  initialFee: number;
  coursePeriods: ICoursePeriods[];
}
