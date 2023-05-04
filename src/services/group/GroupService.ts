import IGroup from "./Group";
import axios from "axios";
import Group from "./Group";
import IGroupService from "./IGroupService";
import IDiscount from "./IDiscount";
import { injectable } from "tsyringe";

@injectable()
export class GroupService implements IGroupService {
  async get(): Promise<IGroup[]> {
    let response = await axios
      .get<IGroup[]>("/rest/v1/group?select=*")
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async add(name: string): Promise<Group> {
    let response = await axios
      .post<IGroup[]>("/rest/v1/group?group", {
        name: name,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }
  async delete(id: number): Promise<Group> {
    var url = "/rest/v1/group?id=eq." + id;
    let response = await axios.delete(url).catch((error) => {
      console.log(error.toJSON());
      throw error;
    });
    return response.data[0];
  }
  async edit(groupToEdit: IGroup): Promise<Group> {
    var url = "/rest/v1/group?id=eq." + groupToEdit.id;
    let response = await axios
      .patch(url, {
        name: groupToEdit.name,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }
  async getDiscount(): Promise<IDiscount[]> {
    let response = await axios
      .get<IDiscount[]>("/rest/v1/discount?select=*")
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async GetDiscountByAmountOfIntegrants(
    studentsAmount: number
  ): Promise<IDiscount> {
    let response = await axios
      .get<IDiscount[]>(
        "/rest/v1/discount?select=*&integrantsAmount=eq." + studentsAmount
      )
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }

  async addDiscounts(
    newAmount: number,
    newDiscount: number
  ): Promise<IDiscount> {
    let response = await axios
      .post<IDiscount[]>("/rest/v1/discount", {
        integrantsAmount: newAmount,
        discountRate: newDiscount,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }
}
