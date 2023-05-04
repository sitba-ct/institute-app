import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import IOutflowCategoryMonthly from "../../../../services/outflow/outflowPerMonthAndCategory/IOutflowCategoryMonthly";
import OutflowCategoryMonthly from "../../../../services/outflow/outflowPerMonthAndCategory/OutflowCategoryMonthly";
import { OutflowService } from "../../../../services/outflow/OutflowService";
import "./MonthlyOutflows.scss";
import { container } from "tsyringe";

const MonthlyOutflows = () => {
  const outflowService = container.resolve(OutflowService);

  const [reportsTranslation] = useTranslation("reports");

  const [outflowsCategory, setOutflowsCategory] = useState<
    IOutflowCategoryMonthly[]
  >([new OutflowCategoryMonthly()]);
  const [totalAmountPerMonth, setTotalAmountPerMonth] = useState<number[]>(
    Array(12).fill(0)
  );

  const [totalAmountPerCategorys, setTotalAmountPerCategorys] = useState<
    number[]
  >([]);
  const [total, setTotal] = useState<number>();
  useEffect(() => {
    initOutflowsCategory();
  }, []);

  const initOutflowsCategory = async () => {
    let categoryOutflow = await outflowService.getOutflowCategoryDetailed();
    let categoryMonthlyOutflow =
      outflowService.getMonthlyOutflow(categoryOutflow);
    setOutflowsCategory(categoryMonthlyOutflow);
    let totalAmountPerMonth = await outflowService.geTotalPerMonth(
      categoryMonthlyOutflow
    );
    setTotalAmountPerMonth(totalAmountPerMonth);

    setTotalAmountPerMonth(totalAmountPerMonth);
    let totalAmountPerCategorys = await outflowService.geTotalPerCategorys(
      categoryMonthlyOutflow
    );
    setTotalAmountPerCategorys(totalAmountPerCategorys);
    setTotal(
      totalAmountPerCategorys.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  };

  return (
    <div className="monthlyOutflowTable">
      <div className="title">
        {reportsTranslation("reports.outflowCategory.outflowCategory")}
      </div>
      <table className="table table-striped text-center ">
        <thead>
          <tr>
            <th>{reportsTranslation("reports.outflowCategory.category")}</th>
            <th>{reportsTranslation("reports.incomeCategory.jan")}</th>
            <th>{reportsTranslation("reports.incomeCategory.feb")}</th>
            <th>{reportsTranslation("reports.incomeCategory.mar")}</th>
            <th>{reportsTranslation("reports.incomeCategory.apr")}</th>
            <th>{reportsTranslation("reports.incomeCategory.may")}</th>
            <th>{reportsTranslation("reports.incomeCategory.jun")}</th>
            <th>{reportsTranslation("reports.incomeCategory.jul")}</th>
            <th>{reportsTranslation("reports.incomeCategory.aug")}</th>
            <th>{reportsTranslation("reports.incomeCategory.sep")}</th>
            <th>{reportsTranslation("reports.incomeCategory.oct")}</th>
            <th>{reportsTranslation("reports.incomeCategory.nov")}</th>
            <th>{reportsTranslation("reports.incomeCategory.dec")}</th>
            <th>{reportsTranslation("reports.incomeCategory.total")}</th>
          </tr>
        </thead>
        <tbody>
          {outflowsCategory.map((outflowCategory, dayIndex) => {
            return (
              <tr key={dayIndex}>
                <th scope="row" className="categoryColumn">
                  {outflowCategory.name}
                </th>
                {outflowCategory.monthlyOutflow.map((monthlyOutflow, index) => {
                  return (
                    <td key={index} className=" ps-3">
                      {monthlyOutflow}
                    </td>
                  );
                })}
                <th className="ps-3">{totalAmountPerCategorys[dayIndex]}</th>
              </tr>
            );
          })}
          <tr>
            <th className="ps-3">Total</th>
            {totalAmountPerMonth.map((monthlyTotal, index) => {
              return (
                <th key={index} className=" ps-3">
                  {monthlyTotal}
                </th>
              );
            })}
            <th className="outflowResult ps-3">{total}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default MonthlyOutflows;
