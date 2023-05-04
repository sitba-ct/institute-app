import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CategoryDailyIncome from "../../../../services/income/incomePerMonthAndCategory/CategoryDailyIncome";
import ICategoryDailyIncome from "../../../../services/income/incomePerMonthAndCategory/ICategoryDailyIncome";
import { IncomeService } from "../../../../services/income/IncomeService";
import "./dailyIncomes.scss";
import { container } from "tsyringe";

const DailyIncomes = () => {
  const incomeService = container.resolve(IncomeService);

  const [reportsTranslation] = useTranslation("reports");

  const [incomesCategorys, setIncomesCategorys] = useState<
    ICategoryDailyIncome[]
  >([new CategoryDailyIncome()]);

  const [monthDays, setMonthDays] = useState<number[]>([]);
  const [totalAmountPerCategorys, setTotalAmountPerCategorys] = useState<
    number[]
  >([]);
  const [totalAmountPerDays, setTotalAmountPerDays] = useState<number[]>([]);
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    initIncomesCategory();
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

  const initIncomesCategory = async () => {
    let categorysIncomes = await incomeService.getIncomesCategoryDetailed();
    let categorysIncomesPerMonth =
      incomeService.getCategorysIncomesFilteredPerMonth(categorysIncomes);
    let categorysDailyIncomes = incomeService.getDailyIncomes(
      categorysIncomesPerMonth
    );
    setIncomesCategorys(categorysDailyIncomes);
    totalAmounts(categorysDailyIncomes);
  };

  const totalAmounts = (categorysDailyIncomes: CategoryDailyIncome[]) => {
    let totalAmountPerCategory = incomeService.getTotalAmountPerCategory(
      categorysDailyIncomes
    );
    setTotalAmountPerCategorys(totalAmountPerCategory);

    let totalAmountPerDays = incomeService.getTotalAmountPerDays(
      categorysDailyIncomes
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
    <div className="dailyIncomesTable">
      <div className="title">
        {reportsTranslation("reports.incomeCategory.incomeCategory")}
      </div>
      <table className="table table-striped text-center ">
        <thead>
          <tr>
            <th>{reportsTranslation("reports.incomeCategory.days")}</th>
            {incomesCategorys.map((incomesCategory, index) => {
              return <th key={index}>{incomesCategory.name}</th>;
            })}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {monthDays.map((dayofTheMonth, dayIndex) => {
            return (
              <tr key={dayIndex}>
                <th scope="row" className="daysColumn">
                  {dayofTheMonth}
                </th>

                {incomesCategorys.map((incomesCategory, index) => {
                  return (
                    <td key={index} className="ps-3">
                      {incomesCategory.daysIncome[dayIndex]}
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
            <th className="incomeResult ps-3">{total}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DailyIncomes;
