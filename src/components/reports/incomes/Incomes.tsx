import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CategoryMonthlyIncome from "../../../services/income/incomePerMonthAndCategory/CategoryMonthlyIncome";
import ICategoryMonthlyIncome from "../../../services/income/incomePerMonthAndCategory/ICategoryMonthlyIncome";
import { IncomeService } from "../../../services/income/IncomeService";
import "./Incomes.scss";
import { container } from "tsyringe";

const Incomes = () => {
  let navigate = useNavigate();

  const incomeService = container.resolve(IncomeService);

  const [reportsTranslation] = useTranslation("reports");

  const [incomesCategory, setIncomesCategory] = useState<
    ICategoryMonthlyIncome[]
  >([new CategoryMonthlyIncome()]);
  const [monthlyTotal, setMonthlyTotal] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  useEffect(() => {
    initIncomesCategory();
  }, []);

  const initIncomesCategory = async () => {
    let categoryIncomes = await incomeService.getIncomesCategoryDetailed();

    let categoryMonthlyIncome =
      incomeService.getMonthlyIncomes(categoryIncomes);

    setIncomesCategory(categoryMonthlyIncome);
    let monthlyTotal = await incomeService.geTotalPerMonth(
      categoryMonthlyIncome
    );
    setMonthlyTotal(monthlyTotal);
  };

  return (
    <div className="incomeTable border border-dark rounded m-4 text-center table-responsive">
      <div className=" border-bottom border-dark rounded fs-5 fw-bold title text-black">
        {reportsTranslation("reports.incomeCategory.incomeCategory")}
      </div>
      <table className="table table-striped text-center ">
        <thead>
          <tr>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.category")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.jan")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.feb")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.mar")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.apr")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.may")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.jun")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.jul")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.aug")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.sep")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.oct")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.nov")}
            </th>
            <th className="ps-3">
              {reportsTranslation("reports.incomeCategory.dec")}
            </th>
          </tr>
        </thead>
        <tbody>
          {incomesCategory.map((incomeCategory, index) => {
            return (
              <tr key={index}>
                <th scope="row"> {incomeCategory.name}</th>
                {incomeCategory.monthlyIncome.map((monthlyIncome, index) => {
                  return (
                    <td key={index} className=" ps-3">
                      {monthlyIncome}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            <th className="ps-3">Total</th>
            {monthlyTotal.map((monthlyTotal, index) => {
              return (
                <td key={index} className=" ps-3">
                  {monthlyTotal}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate(`incomes`);
        }}
      >
        Incomes
      </button>
    </div>
  );
};
export default Incomes;
