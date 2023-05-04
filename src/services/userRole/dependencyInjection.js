import { container } from "tsyringe";
import { IUserRoleService } from "./IUserRoleService";
import { UserRoleService } from "./UserRoleService";

const configureUserRoleServices = () => {
  container.register(`${IUserRoleService}`, { useClass: UserRoleService });
};

export default configureUserRoleServices;
