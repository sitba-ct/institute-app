import { container } from "tsyringe";
import { IStudentService } from "./IStudentService";
import { StudentService } from "./StudentService";
import { IStudentValidationService } from "./validations/IStudentValidationService";
import { StudentValidationService } from "./validations/StudentValidationService";
import { StudentDetailService } from "./studentDetail/StudentDetailService";
import { IStudentDetailService } from "./studentDetail/IStudentDetailService";

const configureStudentsServices = () => {
  container.register(`${IStudentService}`, { useClass: StudentService });
  container.register(`${IStudentValidationService}`, {
    useClass: StudentValidationService,
  });
  container.register(`${IStudentDetailService}`, {
    useClass: StudentDetailService,
  });
};

export default configureStudentsServices;
