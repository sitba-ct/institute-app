import IRole from "./IRole";
import IUserRole from "./IUserRole";

export default interface IUserRoleService {
  newUserRole(userId: string, roleId: number): Promise<IUserRole>;
  deleteUserRole(userId: number): Promise<IUserRole>;
  initRoles(): Promise<IRole[]>;
}
