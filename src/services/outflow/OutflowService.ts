import axios from "axios";
import IOutflowCategory from "./outflowCategory/IOutflowCategory";
import IOutflow from "./IOutflow";
import IOutflowervice from "./IOutflowService";
import IOutflowCategoryMonthly from "./outflowPerMonthAndCategory/IOutflowCategoryMonthly";
import IOutflowCategoryDetailed from "./outflowCategoryDetailed/IOutflowCategoryDetailed";
import OutflowCategoryMonthly from "./outflowPerMonthAndCategory/OutflowCategoryMonthly";
import IDailysOutflowByCategories from "./outflowPerMonthAndCategory/IDailysOutflowByCategories";
import DailysOutflowByCategories from "./outflowPerMonthAndCategory/DailysOutflowByCategories";
import OutflowCategoryDetailed from "./outflowCategoryDetailed/OutflowCategoryDetailed";
import IOutflowExtended from "./IOutflowExtended";
import { injectable } from "tsyringe";
@injectable()
export class OutflowService implements IOutflowervice {
  async getOutflowCategorysList(): Promise<IOutflowCategory[]> {
    let response = await axios
      .get("/rest/v1/outflowCategory?select=*")
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async getOutflow(): Promise<IOutflow[]> {
    let response = await axios
      .get("/rest/v1/outflow?select=*")
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async getOutflowCategoryDetailed(): Promise<IOutflowCategoryDetailed[]> {
    let response = await axios
      .get(
        "/rest/v1/outflowCategory?select=name,outflow(dateRegistered,amount)"
      )
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }

  getMonthlyOutflow(
    OutflowsPerCategory: IOutflowCategoryDetailed[]
  ): IOutflowCategoryMonthly[] {
    let outflowCategoryMonthly = [new OutflowCategoryMonthly()];
    outflowCategoryMonthly = OutflowsPerCategory.map((categoryOutflows) => {
      let categoryOutflow = new OutflowCategoryMonthly();
      categoryOutflow.name = categoryOutflows.name;
      categoryOutflows.outflow.map((monthlyOutflows) => {
        categoryOutflow.monthlyOutflow[
          new Date(monthlyOutflows.dateRegistered).getUTCMonth()
        ] += monthlyOutflows.amount;
        return categoryOutflow;
      });
      return categoryOutflow;
    });
    return outflowCategoryMonthly;
  }
  getCategorysOutflowsFilteredPerMonth(
    incomesPerCategory: IOutflowCategoryDetailed[]
  ): IOutflowCategoryDetailed[] {
    //init variable categoryDailyIncome
    let categoryDailyOutflow = [new OutflowCategoryDetailed()];

    categoryDailyOutflow = incomesPerCategory.map((categoryOutflow) => {
      let categorysOutflow = new OutflowCategoryDetailed();
      categorysOutflow.name = categoryOutflow.name;
      categorysOutflow.outflow = categoryOutflow.outflow.filter(
        (categoryOutflow) =>
          new Date(categoryOutflow.dateRegistered).getUTCMonth() + 1 ===
            new Date().getUTCMonth() + 1 &&
          new Date(categoryOutflow.dateRegistered).getFullYear() ===
            new Date().getFullYear()
      );

      return categorysOutflow;
    });
    return categoryDailyOutflow;
  }

  getDailyOutflow(
    outflowsPerCategories: IOutflowCategoryDetailed[]
  ): IDailysOutflowByCategories[] {
    //init variable categoryDailyIncome
    let dailysOutflowByCategories = [new DailysOutflowByCategories()];

    dailysOutflowByCategories = outflowsPerCategories.map(
      (outflowsPerCategory) => {
        let dailysOutflowByCategory = new DailysOutflowByCategories();

        dailysOutflowByCategory.name = outflowsPerCategory.name;

        outflowsPerCategory.outflow.map((outflowPerCategory) => {
          dailysOutflowByCategory.daysOutflow[
            new Date(outflowPerCategory.dateRegistered).getUTCDate() - 1
          ] += outflowPerCategory.amount;

          return dailysOutflowByCategory;
        });
        return dailysOutflowByCategory;
      }
    );
    return dailysOutflowByCategories;
  }

  async add(outflow: IOutflow): Promise<IOutflow> {
    let response = await axios
      .post("/rest/v1/outflow?select=*", {
        outflowCategoryId: outflow.outflowCategoryId,
        amount: outflow.amount,
        paymentMethodId: outflow.paymentMethodId,
        dateRegistered: new Date(outflow.dateRegistered).toDateString(),
        detail: outflow.detail,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  isValid(outflow: IOutflow): boolean {
    return outflow !== undefined ? true : false;
  }
  geTotalPerMonth(outflowPerCategory: IOutflowCategoryMonthly[]): number[] {
    let monthlyTotal = Array(12).fill(0);
    outflowPerCategory.map((categoryOutflow) => {
      for (var i = 0; i < 12; i++) {
        monthlyTotal[i] += categoryOutflow.monthlyOutflow[i];
      }
      return monthlyTotal;
    });
    return monthlyTotal;
  }
  geTotalPerCategorys(outflowPerCategory: IOutflowCategoryMonthly[]): number[] {
    let monthlyTotal = Array(outflowPerCategory.length).fill(0);
    outflowPerCategory.map((categoryOutflow, index) => {
      for (var i = 0; i < 12; i++) {
        monthlyTotal[index] += categoryOutflow.monthlyOutflow[i];
      }
      return monthlyTotal;
    });
    return monthlyTotal;
  }

  getTotalAmountPerCategory(
    categorysDailyOutflow: IDailysOutflowByCategories[]
  ): number[] {
    let totalAmountPerCategory = Array(categorysDailyOutflow.length).fill(0);

    categorysDailyOutflow.map((categoryDailyOutflow, index) => {
      for (var i = 0; i < 31; i++) {
        totalAmountPerCategory[index] += categoryDailyOutflow.daysOutflow[i];
      }

      return totalAmountPerCategory;
    });

    return totalAmountPerCategory;
  }

  getTotalAmountPerDays(
    categorysDailyIncomes: IDailysOutflowByCategories[]
  ): number[] {
    let totalAmountPerDays = Array(31).fill(0);

    categorysDailyIncomes.map((categoryDailyIncomes, index) => {
      for (var i = 0; i < 31; i++) {
        totalAmountPerDays[i] += categoryDailyIncomes.daysOutflow[i];
      }

      return totalAmountPerDays;
    });

    return totalAmountPerDays;
  }
  async getOutflowExtendedWithDate(
    dateSelected: string
  ): Promise<IOutflowExtended[]> {
    let response = await axios
      .get(
        "/rest/v1/outflow?select=*,outflowCategory(name),paymentMethod(name)&dateRegistered=eq." +
          dateSelected
      )
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
}
