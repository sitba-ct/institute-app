import { TFunction } from "i18next";
import ICourse from "../ICourse";
import ICourseError from "./ICourseError";
import IIncreaseError from "./IIncreaseError";

export default interface ICourseValidationService {
  validateAddCourse(
    name: string,
    startDate: Date,
    initialFee: number,
    courses: ICourse[],
    coursesTranslation: TFunction<"errors", undefined, "errors">
  ): ICourseError;
  validateEditCourse(
    name: string,
    startDate: Date,
    initialFee: number,
    courses: ICourse[],
    coursesTranslation: TFunction<"errors", undefined, "errors">
  ): ICourseError;
  validateIncreaseFee(increaseFee: number): IIncreaseError;
}
