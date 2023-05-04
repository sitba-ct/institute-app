import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DailysOutflowByCategories from "../../../../services/outflow/outflowPerMonthAndCategory/DailysOutflowByCategories";
import IDailysOutflowByCategories from "../../../../services/outflow/outflowPerMonthAndCategory/IDailysOutflowByCategories";
import { OutflowService } from "../../../../services/outflow/OutflowService";
import "./dailyOutflow.scss";
import { container } from "tsyringe";

const DailyOutflow = () => {
  const outflowService = container.resolve(OutflowService);

  const [reportsTranslation] = useTranslation("reports");

  const [dailysOutflowByCategories, setDailysOutflowByCategories] = useState<
    IDailysOutflowByCategories[]
  >([new DailysOutflowByCategories()]);

  const [monthDays, setMonthDays] = useState<number[]>([]);
  const [totalAmountPerCategorys, setTotalAmountPerCategorys] = useState<
    number[]
  >([]);
  const [totalAmountPerDays, setTotalAmountPerDays] = useState<number[]>([]);
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    initOutflowCategory();
  }, []);

  useEffect(() => {
    //set the hook with the amount month days
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Month is zero-indexed, so add 1
    const lastDay = new Date(year, month, 0).getDate();
    const newDays = Array.from({ length: lastDay }, (_, i) => i + 1);
    setMonthDays(newDays);
  }, []);

  const initOutflowCategory = async () => {
    let outflowsCategory = await outflowService.getOutflowCategoryDetailed();
    let categorysOutflowsPerMonth =
      outflowService.getCategorysOutflowsFilteredPerMonth(outflowsCategory);
    let dailysOutflowByCategories = outflowService.getDailyOutflow(
      categorysOutflowsPerMonth
    );
    setDailysOutflowByCategories(dailysOutflowByCategories);
    totalAmounts(dailysOutflowByCategories);
  };

  const totalAmounts = (
    dailysOutflowByCategories: IDailysOutflowByCategories[]
  ) => {
    let totalAmountPerCategory = outflowService.getTotalAmountPerCategory(
      dailysOutflowByCategories
    );
    setTotalAmountPerCategorys(totalAmountPerCategory);

    let totalAmountPerDays = outflowService.getTotalAmountPerDays(
      dailysOutflowByCategories
    );
    setTotalAmountPerDays(totalAmountPerDays);
    setTotal(
      totalAmountPerDays.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  };

  return (
    <div className="DailyOutflowTable">
      <div className=" title">
        {reportsTranslation("reports.outflowCategory.outflowCategory")}
      </div>
      <table className="table table-striped text-center ">
        <thead className="headDailyOutflow">
          <tr>
            <th> {reportsTranslation("reports.outflowCategory.days")}</th>
            {dailysOutflowByCategories.map((outflowCategory, index) => {
              return (
                <th className="categoriesRow" key={index}>
                  {outflowCategory.name}
                </th>
              );
            })}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {monthDays.map((dayofTheMonth, dayIndex) => {
            return (
              <tr key={dayIndex}>
                <th scope="row " className="daysColumn">
                  {dayofTheMonth}
                </th>
                {dailysOutflowByCategories.map((categoriOutflow, index) => {
                  return (
                    <td key={index} className="ps-3 ">
                      {categoriOutflow.daysOutflow[dayIndex]}
                    </td>
                  );
                })}
                <th className="ps-3">{totalAmountPerDays[dayIndex]}</th>
              </tr>
            );
          })}

          <tr>
            <th className="ps-3">Total</th>
            {totalAmountPerCategorys.map((monthTotal, index) => {
              return (
                <th key={index} className=" ps-3">
                  {monthTotal}
                </th>
              );
            })}
            <th className="outflowResult">{total}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DailyOutflow;
