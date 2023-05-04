import axios from "axios";
import ICoursePeriods from "../course/periods/ICoursePeriods";
import IIncome from "../income/IIncome";
import IStudentBasicInfo from "./BasicInfo/IBasicInfo";
import IStudentPeriodFeePayment from "./feePayment/IStudentPeriodFeePayment";
import IStudentPeriodFeePaymentResponse from "./feePayment/IStudentPeriodFeePaymentResponse";
import IStudent from "./IStudent";
import IStudentExpandid from "./IStudentExpandid";
import IStudentService from "./IStudentService";
import ISelectedGroupInfo from "./selectedGroupInfo/ISelectedGroupInfo";
import { injectable } from "tsyringe";
@injectable()
export class StudentService implements IStudentService {
  async get(surname: string): Promise<IStudent[]> {
    let response = await axios
      .get(
        "/rest/v1/student?surname=ilike." +
          surname +
          "*&select=id,name,courseId,groupId,direction,phonenumber,email,DNI,datebirth,parentName,parentDNI,schoolName,schoolTurn,surname,CUIT,courseStartedDate"
      )
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }

  async getStudents(): Promise<IStudent[]> {
    let response = await axios
      .get(
        "/rest/v1/student?*&select=id,name,courseId,groupId,direction,phonenumber,email,DNI,datebirth,parentName,parentDNI,schoolName,schoolTurn,surname"
      )
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async getStudentsBasicInfo(): Promise<IStudentBasicInfo[]> {
    let response = await axios
      .get("/rest/v1/student?*&select=id,name,surname")
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }

  async searchGroup(groupId: number): Promise<ISelectedGroupInfo[]> {
    let response = await axios
      .get(
        "/rest/v1/student?groupId=eq." +
          groupId +
          "&select=id,name,surname,groupId(name),courseId(id,name)"
      )
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async searchStudent(studentId: number): Promise<IStudentExpandid> {
    let response = await axios
      .get(
        "/rest/v1/student?id=eq." +
          studentId +
          "&select=id,name,surname,courseStartedDate,courseId(id,name),groupId(id,name)"
      )
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });

    if (response.data === undefined || response.data === null) {
      throw Error("no data received");
    }

    var student = response.data[0];
    if (student === undefined || student === null) {
      throw Error("no student found");
    }
    return student;
  }
  async getCoursePeriodAndIncome(
    id: number
  ): Promise<IStudentPeriodFeePayment[]> {
    let response = await axios

      .get(
        "/rest/v1/student?id=eq." +
          id +
          "&select=studentPeriodFeePayment(id,coursePeriod(id,period,amountPay,courseId(id,startDate,name,duration,initialFee)),income(id,amount,dateRegistered))"
      )
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    let result: IStudentPeriodFeePaymentResponse = response.data[0];
    return result.studentPeriodFeePayment;
  }
  async add(student: IStudent): Promise<IStudent> {
    let response = await axios

      .post("/rest/v1/student", {
        name: student.name,
        courseId: student.courseId,
        direction: student.direction,
        phonenumber: student.phonenumber,
        groupId: student.groupId === 0 ? null : student.groupId,
        email: student.email,
        DNI: student.DNI,
        datebirth: student.datebirth,
        parentName: student.parentName,
        parentDNI: student.parentDNI,
        schoolName: student.schoolName,
        schoolTurn: student.schoolTurn,
        surname: student.surname,
        CUIT: student.CUIT,
        courseStartedDate: student.courseStartedDate,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }

  async edit(newStudent: IStudent, student: IStudent): Promise<IStudent> {
    let response = await axios
      .patch("/rest/v1/student?id=eq." + student.id, {
        name: newStudent.name,
        courseId: newStudent.courseId,
        groupId: newStudent.groupId === 0 ? null : newStudent.groupId,
        direction: newStudent.direction,
        phonenumber: newStudent.phonenumber,
        email: newStudent.email,
        DNI: newStudent.DNI,
        datebirth: newStudent.datebirth,
        parentName: newStudent.parentName,
        parentDNI: newStudent.parentDNI,
        schoolName: newStudent.schoolName,
        schoolTurn: newStudent.schoolTurn,
        surname: newStudent.surname,
        CUIT: newStudent.CUIT,
        courseStartedDate: newStudent.courseStartedDate,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async addIncome(income: IIncome, amount: number): Promise<IIncome> {
    let response = await axios
      .post("/rest/v1/income?select=*", {
        amount: amount,
        incomeCategoryId: income.incomeCategoryId,
        dateRegistered: new Date(),
        paymentMethodId: income.paymentMethodId,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }

  async getStudentCoursePeriods(courseId: number): Promise<ICoursePeriods[]> {
    let response = await axios
      .get("/rest/v1/coursePeriodo?select=*&courseId=eq." + courseId)
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });

    return response.data;
  }

  async studentIncomePeriodRelation(
    idStudent: number,
    idIncome: number,
    idCoursePeriod: number
  ): Promise<IIncome> {
    let response = await axios
      .post("/rest/v1/studentPeriodFeePayment", {
        student: idStudent,
        income: idIncome,
        coursePeriod: idCoursePeriod,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }

  async getCourseStudents(courseId: number): Promise<IStudent[]> {
    let response = await axios
      .get("/rest/v1/student?select=*&courseId=eq." + courseId)
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async addCourseStudent(
    studentId: number,
    courseId: number
  ): Promise<IStudent> {
    let response = await axios
      .patch("/rest/v1/student?id=eq." + studentId, {
        courseId: courseId,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }
  async removeCourseStudent(studentid: number): Promise<IStudent> {
    let response = await axios
      .patch("/rest/v1/student?id=eq." + studentid, {
        courseId: null,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }
  async getStudentsFromCourse(courseId: number): Promise<IStudent[]> {
    let response = await axios
      .get("/rest/v1/student?select=*&courseId=neq." + courseId)
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }

  async getStudentsWithoutGroup(groupId: number): Promise<IStudent[]> {
    let response = await axios
      .get("/rest/v1/student?select=*&groupId=is." + null)
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async getStudentsGroup(id: number): Promise<IStudent[]> {
    let response = await axios
      .get("/rest/v1/student?select=*&groupId=eq." + id)
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async addStudentToGroup(
    groupId: number,
    studentId: number
  ): Promise<IStudent> {
    let response = await axios
      .patch("/rest/v1/student?id=eq." + studentId, {
        groupId: groupId,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }

  async removeStudentFromGroup(id: number): Promise<IStudent> {
    let response = await axios
      .patch("/rest/v1/student?id=eq." + id, {
        groupId: null,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }
}
