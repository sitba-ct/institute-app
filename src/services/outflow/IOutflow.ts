export default interface IOutflow {
  id: number;
  outflowCategoryId: number;
  dateRegistered: Date;
  amount: number;
  paymentMethodId: number;
  detail: string | null;
}
