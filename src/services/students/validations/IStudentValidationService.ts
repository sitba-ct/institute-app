import IIncome from "../../income/IIncome";
import IStudent from "../IStudent";
import IStudentDetail from "../studentDetail/IStudentDetail";
import StudentError from "./StudentError";

export default interface IStudentValidationService {
  validateAddStudent(students: IStudent[], student: IStudent): StudentError;
  validateEditStudent(
    student: IStudent,
    studentSelectedDetail: IStudentDetail,
    studentGroupDetail: IStudentDetail
  ): StudentError;
  isPaymentValid(income: IIncome, amount: number): boolean;
}
