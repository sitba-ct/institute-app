import { TFunction } from "i18next";
import ICourse from "../ICourse";
import CourseError from "./CourseError";
import ICourseError from "./ICourseError";
import ICourseValidationService from "./ICourseValidationService";
import IIncreaseError from "./IIncreaseError";
import IncreaseError from "./IncreaseError";
import { injectable } from "tsyringe";

@injectable()
export class CourseValidationService implements ICourseValidationService {
  validateAddCourse(
    name: string,
    startDate: Date,
    initialFee: number,
    courses: ICourse[],
    errorsTranslation: TFunction<"errors", undefined, "errors">
  ): ICourseError {
    let errors = new CourseError();
    let existingCourse = courses.find((course) => {
      return course.name.trim().toLowerCase() === name.trim().toLowerCase();
    });

    let regexName = /^[A-Za-zÑñ\s0-9]+$/;

    if (!name.trim()) {
      errors.name = errorsTranslation("courses.errors.add.name.necessary")!;
    } else if (!regexName.test(name.trim())) {
      errors.name = errorsTranslation(
        "courses.errors.add.name.onlyLetersAndSpaces"
      )!;
    } else if (existingCourse) {
      errors.name =
        name + errorsTranslation("courses.errors.add.name.alreadyRegistered")!;
    } else {
      errors.name = "";
    }

    if (!startDate) {
      errors.startDate = "requerido";
    } else if (startDate.getUTCFullYear() !== new Date().getUTCFullYear()) {
      errors.startDate = "Actual year";
    } else {
      errors.startDate = "";
    }

    if (!initialFee) {
      errors.initialFee = "requerido";
    } else if (initialFee < 0 || initialFee > 30000) {
      errors.initialFee = "Entre $0-$30000";
    } else {
      errors.initialFee = "";
    }
    return errors;
  }

  validateEditCourse(
    name: string,
    startDate: Date,
    initialFee: number,
    courses: ICourse[],
    coursesTranslation: TFunction<"errors", undefined, "errors">
  ): ICourseError {
    let errors = new CourseError();

    let regexName = /^[A-Za-zÑñ\s0-9]+$/;

    if (!name.trim()) {
      errors.name = "requerido";
    } else if (!regexName.test(name.trim())) {
      errors.name = "Sólo letras y espacios";
    } else {
      errors.name = "";
    }

    if (!startDate) {
      errors.startDate = "requerido";
    } else if (startDate.getUTCFullYear() !== new Date().getUTCFullYear()) {
      errors.startDate = "Actual year";
    } else {
      errors.startDate = "";
    }

    if (!initialFee) {
      errors.initialFee = "requerido";
    } else if (initialFee < 0 || initialFee > 30000) {
      errors.initialFee = "Entre $0-$30000";
    } else {
      errors.initialFee = "";
    }
    return errors;
  }
  validateIncreaseFee(increaseFee: number): IIncreaseError {
    let errors = new IncreaseError();

    let regexincreaseFee = /^0*(?:[1-9][0-9]?|100)$/;

    if (!regexincreaseFee.test(increaseFee.toString())) {
      errors.increase = "Solo numeros entre 1-100";
    } else errors.increase = "";

    return errors;
  }
}
