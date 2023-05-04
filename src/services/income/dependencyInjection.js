import { container } from "tsyringe";
import { IncomeService } from "./IncomeService";
import { IIncomeService } from "./IIncomeService";
import { IIncomeValidationService } from "./validations/IIncomesValidationService";
import { IncomeValidationService } from "./validations/IncomeValidationService";

const configureIncomeServices = () => {
  container.register(`${IIncomeService}`, { useClass: IncomeService });
  container.register(`${IIncomeValidationService}`, {
    useClass: IncomeValidationService,
  });
};

export default configureIncomeServices;
