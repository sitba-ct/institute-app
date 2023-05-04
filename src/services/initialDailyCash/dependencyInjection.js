import { container } from "tsyringe";
import { InitialCashPerDayService } from "./InitialCashPerDayService";
import { IInitialCashPerDayService } from "./IInitialCashPerDayService";
import { IInitialCashPerDayValidaionService } from "./validations/IInitialCashPerDayValidaionService";
import { InitialCashPerDayValidaionService } from "./validations/InitialCashPerDayValidaionService";

const configureInitialDailyCashServices = () => {
  container.register(`${IInitialCashPerDayService}`, {
    useClass: InitialCashPerDayService,
  });
  container.register(`${IInitialCashPerDayValidaionService}`, {
    useClass: InitialCashPerDayValidaionService,
  });
};

export default configureInitialDailyCashServices;
