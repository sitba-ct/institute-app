import IUserRole from "./IUserRole";

export default class UserRole implements IUserRole {
  constructor(id: number = 0, userId: string = "", roleId: number = 0) {
    this.id = id;
    this.userId = userId;
    this.roleId = roleId;
  }
  id: number;
  userId: string;
  roleId: number;
}
