import IIncome from "../../income/IIncome";
import IStudent from "../IStudent";
import IStudentValidationService from "./IStudentValidationService";
import StudentError from "./StudentError";
import { injectable } from "tsyringe";
@injectable()
export class StudentValidationService implements IStudentValidationService {
  validateAddStudent(students: IStudent[], student: IStudent): StudentError {
    let existingStudent = students.find((students) => {
      return (
        students.name.trim().toLowerCase() ===
          student.name.trim().toLowerCase() &&
        students.surname.trim().toLowerCase() ===
          student.surname.trim().toLowerCase()
      );
    });

    let errors = new StudentError();
    let regexName = /^[A-Za-zÑñ\s]+$/;
    let regexDNI = /^(\d{1,2}\.?\d{3}\.?\d{3})$/;
    let regexPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let regexCUIT =
      /^(20|23|24|25|26|27|30|33|34)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/;

    if (!student.name.trim()) {
      errors.name = "requerido";
    } else if (!regexName.test(student.name.trim())) {
      errors.name = "Sólo letras y espacios";
    } else if (existingStudent) {
      errors.name = student.name + student.surname + " ya esta registrado";
    } else {
      errors.name = "";
    }

    if (!student.surname.trim()) {
      errors.surname = "requerido";
    } else if (!regexName.test(student.surname.trim())) {
      errors.surname = "Sólo letras y espacios";
    } else {
      errors.surname = "";
    }

    if (!student.DNI) {
      errors.DNI = "requerido";
    } else if (!regexDNI.test(student.DNI.toString().trim())) {
      errors.DNI = "Incorrecto";
    } else {
      errors.DNI = "";
    }

    if (!student.courseId) {
      errors.courseId = "requerido";
    } else {
      errors.courseId = "";
    }

    if (!student.phonenumber) {
      errors.phonenumber = "requerido";
    } else if (!regexPhone.test(student.phonenumber.toString().trim())) {
      errors.phonenumber = "Incorrecto";
    } else {
      errors.phonenumber = "";
    }

    // if (!student.courseStartedDate) {
    //   errors.courseStartedDate = "requerido";
    // } else if (
    //   student.courseStartedDate.getFullYear() !== new Date().getFullYear()
    // ) {
    //   errors.courseStartedDate = "Actual year";
    // } else {
    //   errors.courseStartedDate = "";
    // }

    if (!student.email) {
      errors.email = "requerido";
    } else if (!regexEmail.test(student.email.trim())) {
      errors.email = "Incorrecto ";
    } else {
      errors.email = "";
    }

    if (!student.direction) {
      errors.direction = "requerido";
    } else {
      errors.direction = "";
    }

    if (!student.courseId) {
      errors.courseId = "requerido";
    } else {
      errors.courseId = "";
    }
    if (!student.parentName.trim()) {
      errors.parentName = "requerido";
    } else if (!regexName.test(student.parentName.trim())) {
      errors.parentName = "Sólo letras y espacios";
    } else {
      errors.parentName = "";
    }

    if (!student.parentDNI) {
      errors.parentDNI = "requerido";
    } else if (!regexDNI.test(student.parentDNI.toString().trim())) {
      errors.parentDNI = "Incorrecto";
    } else {
      errors.parentDNI = "";
    }

    if (!student.CUIT) {
      errors.CUIT = "requerido";
    } else if (!regexCUIT.test(student.CUIT.toString().trim())) {
      errors.CUIT = "Incorrecto";
    } else {
      errors.CUIT = "";
    }

    return errors;
  }
  validateEditStudent(student: IStudent): StudentError {
    let errors = new StudentError();
    let regexName = /^[A-Za-zÑñ\s]+$/;
    let regexDNI = /^(\d{1,2}\.?\d{3}\.?\d{3})$/;
    let regexPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let regexCUIT =
      /^(20|23|24|25|26|27|30|33|34)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/;

    if (!student.name.trim()) {
      errors.name = "requerido";
    } else if (!regexName.test(student.name.trim())) {
      errors.name = "Sólo letras y espacios";
    } else {
      errors.name = "";
    }

    if (!student.surname.trim()) {
      errors.surname = "requerido";
    } else if (!regexName.test(student.surname.trim())) {
      errors.surname = "Sólo letras y espacios";
    } else {
      errors.surname = "";
    }

    if (!student.DNI) {
      errors.DNI = "requerido";
    } else if (!regexDNI.test(student.DNI.toString().trim())) {
      errors.DNI = "Incorrecto";
    } else {
      errors.DNI = "";
    }

    if (!student.phonenumber) {
      errors.phonenumber = "requerido";
    } else if (!regexPhone.test(student.phonenumber.toString().trim())) {
      errors.phonenumber = "Incorrecto";
    } else {
      errors.phonenumber = "";
    }

    if (!student.email) {
      errors.email = "requerido";
    } else if (!regexEmail.test(student.email.trim())) {
      errors.email = "Incorrecto ";
    } else {
      errors.email = "";
    }

    if (!student.direction) {
      errors.direction = "requerido";
    } else {
      errors.direction = "";
    }

    if (!student.courseId) {
      errors.courseId = "requerido";
    } else {
      errors.courseId = "";
    }

    // if (!student.courseStartedDate) {
    //   errors.courseStartedDate = "requerido";
    // } else if (
    //   new Date(student.courseStartedDate).getFullYear() !==
    //   new Date().getFullYear()
    // ) {
    //   errors.courseStartedDate = "Actual year";
    // } else {
    //   errors.courseStartedDate = "";
    // }

    if (!student.parentName.trim()) {
      errors.parentName = "requerido";
    } else if (!regexName.test(student.parentName.trim())) {
      errors.parentName = "Sólo letras y espacios";
    } else {
      errors.parentName = "";
    }

    if (!student.parentDNI) {
      errors.parentDNI = "requerido";
    } else if (!regexDNI.test(student.parentDNI.toString().trim())) {
      errors.parentDNI = "Incorrecto";
    } else {
      errors.parentDNI = "";
    }

    if (!student.CUIT) {
      errors.CUIT = "requerido";
    } else if (!regexCUIT.test(student.CUIT.toString().trim())) {
      errors.CUIT = "Incorrecto";
    } else {
      errors.CUIT = "";
    }

    return errors;
  }

  isPaymentValid(income: IIncome, amount: number): boolean {
    return amount > 0 && income.paymentMethodId > 0 ? true : false;
  }
}
