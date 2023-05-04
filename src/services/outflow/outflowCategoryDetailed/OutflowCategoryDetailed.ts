import IOutflow from "../IOutflow";
import Outflow from "../Outflow";
import IOutflowCategoryDetailed from "./IOutflowCategoryDetailed";

export default class OutflowCategoryDetailed
  implements IOutflowCategoryDetailed
{
  constructor(name: string = "", outflow: IOutflow[] = [new Outflow()]) {
    this.name = name;
    this.outflow = outflow;
  }

  name: string;
  outflow: IOutflow[];
}
