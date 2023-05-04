import { container } from "tsyringe";
import { ICourseService } from "./ICourseService";
import { CourseService } from "./CourseService";
import { ICourseValidationService } from "./validations/ICourseValidationService";
import { CourseValidationService } from "./validations/CourseValidationService";
import { ICoursesAndPeriodsService } from "./coursesAndPeriods/ICoursesAndPeriodsService";
import { CoursesAndPeriodsService } from "./coursesAndPeriods/CoursesAndPeriodsService";

const configureCourseServices = () => {
  container.register(`${ICourseService}`, { useClass: CourseService });
  container.register(`${ICourseValidationService}`, {
    useClass: CourseValidationService,
  });
  container.register(`${ICoursesAndPeriodsService}`, {
    useClass: CoursesAndPeriodsService,
  });
};

export default configureCourseServices;
