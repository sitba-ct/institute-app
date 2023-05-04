import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CategoryMonthlyIncome from "../../../../services/income/incomePerMonthAndCategory/CategoryMonthlyIncome";
import ICategoryMonthlyIncome from "../../../../services/income/incomePerMonthAndCategory/ICategoryMonthlyIncome";
import { IncomeService } from "../../../../services/income/IncomeService";
import "./MonthlyIncomes.scss";
import { container } from "tsyringe";

const MonthlyIncomes = () => {
  const incomeService = container.resolve(IncomeService);

  const [reportsTranslation] = useTranslation("reports");

  const [incomesCategory, setIncomesCategory] = useState<
    ICategoryMonthlyIncome[]
  >([new CategoryMonthlyIncome()]);
  const [totalAmountPerMonth, setTotalAmountPerMonth] = useState<number[]>(
    Array(12).fill(0)
  );
  const [totalAmountPerCategorys, setTotalAmountPerCategorys] = useState<
    number[]
  >([]);
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    initIncomesCategory();
  }, []);
  const initIncomesCategory = async () => {
    let categoryIncomes = await incomeService.getIncomesCategoryDetailed();
    let categoryMonthlyIncome =
      incomeService.getMonthlyIncomes(categoryIncomes);

    setIncomesCategory(categoryMonthlyIncome);
    let totalAmountPerMonth = await incomeService.geTotalPerMonth(
      categoryMonthlyIncome
    );

    setTotalAmountPerMonth(totalAmountPerMonth);
    let totalAmountPerCategorys = await incomeService.geTotalPerCategorys(
      categoryMonthlyIncome
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
    <div className="monthlyincomeTable">
      <div className="title">
        {reportsTranslation("reports.incomeCategory.incomeCategory")}
      </div>
      <table className="table table-striped text-center ">
        <thead>
          <tr>
            <th>{reportsTranslation("reports.incomeCategory.category")}</th>
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
          {incomesCategory.map((incomeCategory, dayIndex) => {
            return (
              <tr key={dayIndex}>
                <th scope="row" className="categoryColumn">
                  {" "}
                  {incomeCategory.name}
                </th>
                {incomeCategory.monthlyIncome.map((monthlyIncome, index) => {
                  return (
                    <td key={index} className=" ps-3">
                      {monthlyIncome}
                    </td>
                  );
                })}
                <th className="ps-3">{totalAmountPerCategorys[dayIndex]}</th>
              </tr>
            );
          })}
          <tr>
            <th>Total</th>
            {totalAmountPerMonth.map((monthlyTotal, index) => {
              return (
                <th key={index} className=" ps-3">
                  {monthlyTotal}
                </th>
              );
            })}
            <th className="incomeResult ps-3">{total}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default MonthlyIncomes;
