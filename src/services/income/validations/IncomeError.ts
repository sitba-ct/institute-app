import IIncomesError from "./IIncomeError";

export default class IncomeError implements IIncomesError {
  constructor(
    id: string | undefined = "",
    incomeCategoryId: string | undefined = undefined,
    paymentMethodId: string | undefined = undefined,
    dateRegistered: string | undefined = undefined,
    amount: string | undefined = undefined,
    studentIncome: string | undefined = ""
  ) {
    this.id = id;
    this.incomeCategoryId = incomeCategoryId;
    this.paymentMethodId = paymentMethodId;
    this.dateRegistered = dateRegistered;
    this.amount = amount;
    this.studentIncome = studentIncome;
  }
  id: string | undefined;
  incomeCategoryId: string | undefined;
  paymentMethodId: string | undefined;
  dateRegistered: string | undefined;
  amount: string | undefined;
  studentIncome: string | undefined;
}
