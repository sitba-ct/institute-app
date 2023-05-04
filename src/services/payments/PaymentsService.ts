import ICoursePeriods from "../course/periods/ICoursePeriods";
import IStudentPeriodFeePayment from "../students/feePayment/IStudentPeriodFeePayment";
import { StudentService } from "../students/StudentService";
import IPaymentsService from "./IPaymentsService";
import { injectable } from "tsyringe";
import { container } from "tsyringe";

@injectable()
export class PaymentsService implements IPaymentsService {
  async addStudentPaidPeriods(
    studentId: number,
    incomeId: number,
    periodsToPay: IStudentPeriodFeePayment[],
    studentCourseId: number
  ) {
    const studentService = container.resolve(StudentService);

    let StudentCoursePeriods: ICoursePeriods[] =
      await studentService.getStudentCoursePeriods(studentCourseId);

    periodsToPay.forEach(async (periodToPay) => {
      let studentPeriodListMatchUnpayedPeriods: ICoursePeriods | undefined =
        StudentCoursePeriods.find(
          (studentList) =>
            studentList.period === periodToPay.coursePeriod.period
        );
      if (studentPeriodListMatchUnpayedPeriods !== undefined) {
        await studentService.studentIncomePeriodRelation(
          studentId,
          incomeId,
          studentPeriodListMatchUnpayedPeriods.id
        );
      }
    });
  }
}
