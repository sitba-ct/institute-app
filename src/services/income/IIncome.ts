export default interface IIncome {
  id: number;
  incomeCategoryId: number;
  dateRegistered: Date;
  amount: number;
  studentId: number | null;
  paymentMethodId: number;
  detail: string | null;
}
