import IBockletPayment from "./IBookletPayment";

export default class BockletPayment implements IBockletPayment {
  constructor(
    courseStudentId: number = 0,
    studentName: string = "",
    studentSurname: string = "",
    totalAmount: number = 0
  ) {
    this.courseStudentId = courseStudentId;
    this.studentName = studentName;
    this.studentSurname = studentSurname;
    this.totalAmount = totalAmount;
  }
  courseStudentId: number;
  studentName: string;
  studentSurname: string;
  totalAmount: number;
}
