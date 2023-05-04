import IIncome from "./IIncome";

export default class Income implements IIncome {
  constructor(
    id: number = 0,
    incomeCategoryId: number = 0,
    dateRegistered: Date = new Date(),
    amount: number = 0,
    studentId: number | null = null,
    paymentMethodId: number = 0,
    detail: string | null = null
  ) {
    this.id = id;
    this.incomeCategoryId = incomeCategoryId;
    this.dateRegistered = dateRegistered;
    this.amount = amount;
    this.studentId = studentId;
    this.paymentMethodId = paymentMethodId;
    this.detail = detail;
  }
  id: number;
  incomeCategoryId: number;
  dateRegistered: Date;
  amount: number;
  studentId: number | null;
  paymentMethodId: number;
  detail: string | null;
}
