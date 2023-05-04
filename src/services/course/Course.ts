import ICourse from "./ICourse";

export default class Course implements ICourse {
  constructor(
    id: number = 0,
    name: string = "",
    duration: number = 0,
    startDate: Date = new Date(),
    initialFee: number = 0
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.startDate = startDate;
    this.initialFee = initialFee;
  }
  id: number;
  name: string;
  duration: number;
  startDate: Date;
  initialFee: number;
}
