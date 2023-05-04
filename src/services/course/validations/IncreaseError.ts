import IIncreaseError from "./IIncreaseError";

export default class IncreaseError implements IIncreaseError {
  constructor(increase: string | undefined = undefined) {
    this.increase = increase;
  }

  increase: string | undefined;
}
