import { container } from "tsyringe";
import { PaymentsService } from "./PaymentsService";
import { IPaymentsService } from "./IPaymentsService";

const configurePaymentsServices = () => {
  container.register(`${IPaymentsService}`, {
    useClass: PaymentsService,
  });
};

export default configurePaymentsServices;
