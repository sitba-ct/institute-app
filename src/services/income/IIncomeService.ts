import IIncome from "./IIncome";
import ICategoryMonthlyIncome from "./incomePerMonthAndCategory/ICategoryMonthlyIncome";
import IIncomeCategory from "./incomeCategory/IIncomeCategory";
import IIncomesCategoryDetailed from "./incomesCategoryDetailed/IIncomesCategoryDetailed";
import ICategoryDailyIncome from "./incomePerMonthAndCategory/ICategoryDailyIncome";
import IPaymentMethod from "./paymentMethods/IPaymentMethod";
import IIncomesExtended from "./IIncomesExtended";

export default interface IIncomeService {
  getIncomeCategorysList(): Promise<IIncomeCategory[]>;
  getIncomes(): Promise<IIncome[]>;
  getIncomesCategoryDetailed(): Promise<IIncomesCategoryDetailed[]>;
  getMonthlyIncomes(
    incomesPerCategory: IIncomesCategoryDetailed[]
  ): ICategoryMonthlyIncome[];
  getDailyIncomes(
    incomesPerCategory: IIncomesCategoryDetailed[]
  ): ICategoryDailyIncome[];
  add(income: IIncome): Promise<IIncome>;
  isValid(income: IIncome): boolean;
  geTotalPerMonth(incomesPerCategory: ICategoryMonthlyIncome[]): number[];
  geTotalPerCategorys(incomesPerCategory: ICategoryMonthlyIncome[]): number[];
  getStudentIncomes(income: IIncome): Promise<IIncome[]>;
  getPaymentMethodsList(): Promise<IPaymentMethod[]>;
  getIncomesExtendedWithDate(dateSelected: string): Promise<IIncomesExtended[]>;
}
