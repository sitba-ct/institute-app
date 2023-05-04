import ICoursePeriods from "../course/periods/ICoursePeriods";
import IIncome from "../income/IIncome";
import IStudentBasicInfo from "./BasicInfo/IBasicInfo";
import IStudentPeriodFeePayment from "./feePayment/IStudentPeriodFeePayment";
import IStudent from "./IStudent";
import IStudentExpandid from "./IStudentExpandid";
import ISelectedGroupInfo from "./selectedGroupInfo/ISelectedGroupInfo";

export default interface IStudentService {
  get(surName: string): Promise<IStudent[]>;
  getStudents(): Promise<IStudent[]>;
  getStudentsBasicInfo(): Promise<IStudentBasicInfo[]>;
  searchGroup(groupId: number): Promise<ISelectedGroupInfo[]>;
  searchStudent(studentId: number): Promise<IStudentExpandid>;
  getCoursePeriodAndIncome(id: number): Promise<IStudentPeriodFeePayment[]>;
  add(student: IStudent): Promise<IStudent>;
  edit(student: IStudent, students: IStudent): Promise<IStudent>;
  addIncome(income: IIncome, amount: number): Promise<IIncome>;
  getStudentCoursePeriods(courseId: number): Promise<ICoursePeriods[]>;
  studentIncomePeriodRelation(
    idStudent: number,
    idCoursePeriod: number,
    idIncome: number
  ): Promise<IIncome>;

  getCourseStudents(courseId: number): Promise<IStudent[]>;
  getStudentsFromCourse(courseId: number): Promise<IStudent[]>;
  addCourseStudent(studentId: number, courseId: number): Promise<IStudent>;
  removeCourseStudent(studentid: number): Promise<IStudent>;

  getStudentsWithoutGroup(groupId: number): Promise<IStudent[]>;
  getStudentsGroup(id: number): Promise<IStudent[]>;
  addStudentToGroup(groupId: number, studentId: number): Promise<IStudent>;
  removeStudentFromGroup(id: number): Promise<IStudent>;
}
