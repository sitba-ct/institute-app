import { useEffect, useState } from "react";
import IIncome from "../../services/income/IIncome";
import Income from "../../services/income/Income";
import IIncomeCategory from "../../services/income/incomeCategory/IIncomeCategory";
import IncomeCategory from "../../services/income/incomeCategory/IncomeCategory";
import CategoryMonthlyIncome from "../../services/income/incomePerMonthAndCategory/CategoryMonthlyIncome";
import ICategoryMonthlyIncome from "../../services/income/incomePerMonthAndCategory/ICategoryMonthlyIncome";
import { IncomeService } from "../../services/income/IncomeService";
import IOutflow from "../../services/outflow/IOutflow";
import Outflow from "../../services/outflow/Outflow";
import IOutflowCategory from "../../services/outflow/outflowCategory/IOutflowCategory";
import OutflowCategory from "../../services/outflow/outflowCategory/OutflowCategory";
import IOutflowCategoryMonthly from "../../services/outflow/outflowPerMonthAndCategory/IOutflowCategoryMonthly";
import OutflowCategoryMonthly from "../../services/outflow/outflowPerMonthAndCategory/OutflowCategoryMonthly";
import { OutflowService } from "../../services/outflow/OutflowService";
import AddIncome from "./incomes/addIncome/AddIncome";
import AddOutflow from "./outFlows/addOutflow/AddOutflow";
import "./cashflow.scss";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "../../services/income/paymentMethods/PaymentMethod";
import IPaymentMethod from "../../services/income/paymentMethods/IPaymentMethod";
import { container } from "tsyringe";
import { useTranslation } from "react-i18next";

const CashFlows = () => {
  const incomeService = container.resolve(IncomeService);
  const outflowService = container.resolve(OutflowService);

  const [cashFlowTranslation] = useTranslation("cashFlow");

  const navigate = useNavigate();

  const [incomesCategory, setIncomesCategory] = useState<
    ICategoryMonthlyIncome[]
  >([new CategoryMonthlyIncome()]);
  const [incomes, setIncomes] = useState<IIncome[]>([new Income()]);
  const [paymentMethods, setPaymentMethod] = useState<IPaymentMethod[]>([
    new PaymentMethod(),
  ]);
  const [incomeCategory, setIncomeCategory] = useState<IIncomeCategory[]>([
    new IncomeCategory(),
  ]);

  const [, setOutflowsCategory] = useState<IOutflowCategoryMonthly[]>([
    new OutflowCategoryMonthly(),
  ]);
  const [outflows, setOutflows] = useState<IOutflow[]>([new Outflow()]);
  const [outflowCategory, setOutflowCategory] = useState<IOutflowCategory[]>([
    new OutflowCategory(),
  ]);

  useEffect(() => {
    initIncomesCategory();

    initIncomes();
    initIncomeCategory();
  }, []);

  const initIncomes = async () => {
    let incomes = await incomeService.getIncomes();
    setIncomes(incomes);
  };

  const initIncomeCategory = async () => {
    let incomeCategory = await incomeService.getIncomeCategorysList();
    setIncomeCategory(incomeCategory);
  };

  const initIncomesCategory = async () => {
    let categoryIncomes = await incomeService.getIncomesCategoryDetailed();
    let categoryMonthlyIncome =
      incomeService.getMonthlyIncomes(categoryIncomes);
    setIncomesCategory(categoryMonthlyIncome);
  };

  useEffect(() => {
    initIncomesCategory();
    initpaymentMethod();
    initIncomes();
    initIncomeCategory();
  }, []);

  useEffect(() => {
    initOutflowsCategory();
    initOutflows();
    initOutflowCategory();
  }, []);

  const initOutflows = async () => {
    let outflow = await outflowService.getOutflow();
    setOutflows(outflow);
  };

  const initOutflowCategory = async () => {
    let outflowCategory = await outflowService.getOutflowCategorysList();
    setOutflowCategory(outflowCategory);
  };

  const initOutflowsCategory = async () => {
    let categoryOutflow = await outflowService.getOutflowCategoryDetailed();
    let categoryMonthlyOutflow =
      outflowService.getMonthlyOutflow(categoryOutflow);
    setOutflowsCategory(categoryMonthlyOutflow);
  };

  const initpaymentMethod = async () => {
    let paymentMethodsList = await incomeService.getPaymentMethodsList();
    setPaymentMethod(paymentMethodsList);
  };

  return (
    <div>
      <div className="d-flex bd-highlight p-3 ">
        <AddIncome
          initIncomesCategory={initIncomesCategory}
          incomes={incomes}
          incomeCategory={incomeCategory}
          paymentMethods={paymentMethods}
        />
      </div>
      <div className="d-flex bd-highlight p-3 ">
        <AddOutflow
          initOutflowsCategory={initOutflowsCategory}
          outflows={outflows}
          outflowCategory={outflowCategory}
          paymentMethods={paymentMethods}
        />
      </div>
      <div
        className="d-flex bd-highlight p-3  "
        onClick={() => {
          navigate("/cashflow/bookletPaymentControl");
        }}
      >
        <div className=" incomesPerStudentButton">
          {cashFlowTranslation(
            "cashFlow.bookletPaymentControl.bookletPaymentControl"
          )}
        </div>
      </div>

      <div
        className="d-flex bd-highlight p-3  "
        onClick={() => {
          navigate("/cashflow/daily");
        }}
      >
        <div className=" incomesPerStudentButton">
          {cashFlowTranslation(
            "cashFlow.dailyCashflow.initialDailyCash.cashBox"
          )}
        </div>
      </div>
    </div>
  );
};

export default CashFlows;
