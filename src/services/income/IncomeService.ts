import axios from "axios";
import IIncome from "./IIncome";
import CategoryMonthlyIncome from "./incomePerMonthAndCategory/CategoryMonthlyIncome";
import ICategoryMonthlyIncome from "./incomePerMonthAndCategory/ICategoryMonthlyIncome";
import IIncomeCategory from "./incomeCategory/IIncomeCategory";
import IIncomesCategoryDetailed from "./incomesCategoryDetailed/IIncomesCategoryDetailed";
import IIncomeService from "./IIncomeService";
import CategoryDailyIncome from "./incomePerMonthAndCategory/CategoryDailyIncome";
import ICategoryDailyIncome from "./incomePerMonthAndCategory/ICategoryDailyIncome";
import IncomesCategoryDetailed from "./incomesCategoryDetailed/IncomesCategoryDetailed";
import IIncomesExtended from "./IIncomesExtended";
import IPaymentMethod from "./paymentMethods/IPaymentMethod";
import { injectable } from "tsyringe";

@injectable()
export class IncomeService implements IIncomeService {
  async getIncomeCategorysList(): Promise<IIncomeCategory[]> {
    let response = await axios
      .get("/rest/v1/incomeCategory?select=*")
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async getIncomes(): Promise<IIncome[]> {
    let response = await axios
      .get("/rest/v1/income?select=*")
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async getIncomesCategoryDetailed(): Promise<IIncomesCategoryDetailed[]> {
    let response = await axios
      .get("/rest/v1/incomeCategory?select=name,income(dateRegistered,amount)")
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }

  getMonthlyIncomes(
    incomesPerCategory: IIncomesCategoryDetailed[]
  ): ICategoryMonthlyIncome[] {
    let categoryMonthlyIncome = [new CategoryMonthlyIncome()];
    categoryMonthlyIncome = incomesPerCategory.map((categoryIncomes) => {
      let categoryIncome = new CategoryMonthlyIncome();
      categoryIncome.name = categoryIncomes.name;
      categoryIncomes.income.map((monthlyIncomes) => {
        categoryIncome.monthlyIncome[
          new Date(monthlyIncomes.dateRegistered).getUTCMonth()
        ] += monthlyIncomes.amount;

        return categoryIncome;
      });
      return categoryIncome;
    });
    return categoryMonthlyIncome;
  }

  getCategorysIncomesFilteredPerMonth(
    incomesPerCategory: IIncomesCategoryDetailed[]
  ): IIncomesCategoryDetailed[] {
    //init variable categoryDailyIncome
    let categoryDailyIncome = [new IncomesCategoryDetailed()];

    categoryDailyIncome = incomesPerCategory.map((categoryIncomes) => {
      let categorysIncome = new IncomesCategoryDetailed();
      categorysIncome.name = categoryIncomes.name;
      categorysIncome.income = categoryIncomes.income.filter(
        (categoryIncome) =>
          new Date(categoryIncome.dateRegistered).getUTCMonth() + 1 ===
            new Date().getUTCMonth() + 1 &&
          new Date(categoryIncome.dateRegistered).getFullYear() ===
            new Date().getFullYear()
      );

      return categorysIncome;
    });
    return categoryDailyIncome;
  }

  getDailyIncomes(
    incomesPerCategory: IIncomesCategoryDetailed[]
  ): ICategoryDailyIncome[] {
    //init variable categoryDailyIncome
    let categoryDailyIncome = [new CategoryDailyIncome()];

    categoryDailyIncome = incomesPerCategory.map((categoryIncomes) => {
      let categoryIncome = new CategoryDailyIncome();

      categoryIncome.name = categoryIncomes.name;

      categoryIncomes.income.map((categoryIncomes) => {
        categoryIncome.daysIncome[
          new Date(categoryIncomes.dateRegistered).getUTCDate() - 1
        ] += categoryIncomes.amount;

        return categoryIncome;
      });
      return categoryIncome;
    });
    return categoryDailyIncome;
  }

  async add(income: IIncome): Promise<IIncome> {
    let response = await axios
      .post("/rest/v1/income?select=*", {
        incomeCategoryId: income.incomeCategoryId,
        amount: income.amount,
        dateRegistered: new Date(income.dateRegistered).toDateString(),
        studentId: income.studentId,
        paymentMethodId: income.paymentMethodId,
        detail: income.detail,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  isValid(income: IIncome): boolean {
    return income !== undefined ? true : false;
  }
  geTotalPerMonth(incomesPerCategory: ICategoryMonthlyIncome[]): number[] {
    let totalPerMonth = Array(12).fill(0);
    incomesPerCategory.map((categoryIncomes) => {
      for (var i = 0; i < 12; i++) {
        totalPerMonth[i] += categoryIncomes.monthlyIncome[i];
      }
      return totalPerMonth;
    });
    return totalPerMonth;
  }

  geTotalPerCategorys(incomesPerCategory: ICategoryMonthlyIncome[]): number[] {
    let totalPerCategorys = Array(incomesPerCategory.length).fill(0);
    incomesPerCategory.map((categoryIncomes, index) => {
      for (var i = 0; i < 12; i++) {
        totalPerCategorys[index] += categoryIncomes.monthlyIncome[i];
      }
      return totalPerCategorys;
    });
    return totalPerCategorys;
  }

  getTotalAmountPerCategory(
    categorysDailyIncomes: ICategoryDailyIncome[]
  ): number[] {
    let totalAmountPerCategory = Array(categorysDailyIncomes.length).fill(0);

    categorysDailyIncomes.map((categoryDailyIncomes, index) => {
      for (var i = 0; i < 31; i++) {
        totalAmountPerCategory[index] += categoryDailyIncomes.daysIncome[i];
      }

      return totalAmountPerCategory;
    });

    return totalAmountPerCategory;
  }

  getTotalAmountPerDays(
    categorysDailyIncomes: ICategoryDailyIncome[]
  ): number[] {
    let totalAmountPerDays = Array(31).fill(0);

    categorysDailyIncomes.map((categoryDailyIncomes, index) => {
      for (var i = 0; i < 31; i++) {
        totalAmountPerDays[i] += categoryDailyIncomes.daysIncome[i];
      }

      return totalAmountPerDays;
    });

    return totalAmountPerDays;
  }

  async getStudentIncomes(income: IIncome): Promise<IIncome[]> {
    let response = await axios
      .get("/rest/v1/income?select=*&studentId=eq." + income.studentId)
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async getStudentAndCategodyIncomes(
    incomeCategoryId: number,
    studentId?: number
  ): Promise<IIncomesExtended[]> {
    let response = studentId
      ? await axios.get(
          "/rest/v1/income?select=*,incomeCategory(*),student(*)&studentId=eq." +
            studentId +
            "&incomeCategoryId=eq." +
            incomeCategoryId
        )
      : await axios
          .get(
            "/rest/v1/income?select=*,incomeCategory(*),student(*)&incomeCategoryId=eq." +
              incomeCategoryId
          )
          .catch((error) => {
            console.log(error.toJSON());
            throw error;
          });
    return response.data;
  }

  async getIncomesExtendedWithDate(
    dateSelected: string
  ): Promise<IIncomesExtended[]> {
    let response = await axios
      .get(
        "/rest/v1/income?select=*,incomeCategory(name),student(name,surname),paymentMethod(name)&dateRegistered=eq." +
          dateSelected
      )
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async getPaymentMethodsList(): Promise<IPaymentMethod[]> {
    let response = await axios
      .get("/rest/v1/paymentMethod?select=*")
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
}
