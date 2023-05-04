import IStudent from "../students/IStudent";
import IIncomeCategory from "./incomeCategory/IIncomeCategory";
import IPaymentMethod from "./paymentMethods/IPaymentMethod";

export default interface IIncomesExtended {
  id: number;
  incomeCategoryId: number;
  amount: number;
  dateRegistered: Date;
  studentId: number;
  incomeCategory: IIncomeCategory;
  student: IStudent;
  paymentMethod: IPaymentMethod;
  detail: string | null;
  paymentMethodName: string | null;
  incomeCategoryName: string | null;
  whoPayed: string | null;
}
