import { container } from "tsyringe";
import { OutflowService } from "./OutflowService";
import { IOutflowService } from "./IOutflowService";
import { OutflowValidationService } from "./validations/OutflowValidationService";
import { IOutflowValidationService } from "./validations/IOutflowValidationService";

const configureOutflowServices = () => {
  container.register(`${IOutflowService}`, {
    useClass: OutflowService,
  });
  container.register(`${IOutflowValidationService}`, {
    useClass: OutflowValidationService,
  });
};

export default configureOutflowServices;
