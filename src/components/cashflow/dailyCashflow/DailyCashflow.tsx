import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import IIncomesExtended from "../../../services/income/IIncomesExtended";
import { IncomeService } from "../../../services/income/IncomeService";
import IOutflowExtended from "../../../services/outflow/IOutflowExtended";
import { OutflowService } from "../../../services/outflow/OutflowService";
import { supabase } from "../../../utils/supabaseClient";
import "./dailyCashflow.scss";
import InitialDailyCash from "./InitialDailyCash";
import { container } from "tsyringe";
import { IndexKind } from "typescript";

const DailyCashflow = () => {
  const [cashFlowTranslation] = useTranslation("cashFlow");

  const [incomesExtendedList, setIncomesExtendedList] = useState<
    IIncomesExtended[]
  >([]);

  const [outflowsExtendedList, setOutflowsExtendedList] = useState<
    IOutflowExtended[]
  >([]);
  const [dateSelected, setDateSelected] = useState<string>(
    new Date().toISOString()
  );
  const [initialDailyCash, setInitialDailyCash] = useState<number>(0);
  const [sumCashIncomes, setSumCashIncomes] = useState<number>(0);
  const [sumCashOutflow, setSumCashOutflow] = useState<number>(0);
  const [resume, setResume] = useState<number>(0);

  useEffect(() => {
    initIncomes();
    initOutflows();
    initInitialDailyCash();
  }, [dateSelected]);

  const initInitialDailyCash = async () => {
    let { data, error } = await supabase
      .from("initialCash")
      .select("amount")
      .eq("date", dateSelected);

    if (data![0] !== undefined && data) {
      setInitialDailyCash(data[data.length - 1].amount);
    } else setInitialDailyCash(0);
  };

  const initIncomes = async () => {
    let incomesExtendedList = await getIncomes(dateSelected);
    let incomesWithoutFees = filterIncomesExtendedList(incomesExtendedList);
    let feesIncomes = await getViewFeesIncomes(dateSelected);

    let incomes = incomesWithoutFees.concat(feesIncomes!);
    setIncomesExtendedList(incomes);
  };

  useEffect(() => {
    let cashIncomes = cashIncomesFilter(incomesExtendedList);
    let sumCashIncomes = sumIncomes(cashIncomes);
    setSumCashIncomes(sumCashIncomes);
  }, [incomesExtendedList]);

  const initOutflows = async () => {
    let outflowsExtendedList = await getOutflows(dateSelected);
    setOutflowsExtendedList(outflowsExtendedList);
  };

  useEffect(() => {
    let cashOutflows = cashOutflowsFilter(outflowsExtendedList);
    let sumCashOutflows = sumOutflows(cashOutflows);
    setSumCashOutflow(sumCashOutflows);
  }, [outflowsExtendedList]);

  useEffect(() => {
    let resume = initialDailyCash + sumCashIncomes - sumCashOutflow;
    setResume(resume);
  }, [initialDailyCash, sumCashOutflow, sumCashIncomes]);

  let incomeArray: any = [];
  incomeArray = htmlBodyIncomes(incomesExtendedList, incomeArray);

  let outflowArray: any = [];
  outflowArray = htmlBodyOutflows(outflowsExtendedList, outflowArray);

  return (
    <div className="dailyCashflowContainer">
      <div className="d-flex flex-row pb-2 dateStyle">
        <p className=" px-2 pt-2 h6">
          {cashFlowTranslation("cashFlow.dailyCashflow.date")}
        </p>
        <div>
          <Form.Control
            type="Date"
            name="dateRegistered"
            onChange={(event) => {
              setDateSelected(event.target.value);
            }}
          />
        </div>
        <div className="ps-2"></div>
      </div>
      <div className="tableContainer">
        <p style={{ backgroundColor: " #77a5d4d4" }}>
          {cashFlowTranslation("cashFlow.dailyCashflow.incomes")}
        </p>
        <p>{cashFlowTranslation("cashFlow.dailyCashflow.outflows")}</p>
        <table className="table table-striped incomeTable ">
          <thead>
            <tr>
              <th>{cashFlowTranslation("cashFlow.dailyCashflow.category")}</th>
              <th>{cashFlowTranslation("cashFlow.dailyCashflow.amount")}</th>
              <th>{cashFlowTranslation("cashFlow.dailyCashflow.name")}</th>
              <th className="paymentMethod">
                {cashFlowTranslation("cashFlow.dailyCashflow.paymentMethod")}
              </th>
              <th className="detailsContainer">
                {cashFlowTranslation("cashFlow.dailyCashflow.detail")}
              </th>
            </tr>
          </thead>
          <tbody>{incomeArray}</tbody>
        </table>
        <table className="table table-striped outflowTable">
          <thead>
            <tr>
              <th>{cashFlowTranslation("cashFlow.dailyCashflow.category")}</th>
              <th>{cashFlowTranslation("cashFlow.dailyCashflow.amount")}</th>
              <th className="paymentMethod">
                {cashFlowTranslation("cashFlow.dailyCashflow.paymentMethod")}
              </th>
              <th className="detailsContainer">
                {cashFlowTranslation("cashFlow.dailyCashflow.detail")}
              </th>
            </tr>
          </thead>
          <tbody>{outflowArray}</tbody>
        </table>
      </div>
      <div className="resultsContainer">
        <b> {cashFlowTranslation("cashFlow.dailyCashflow.initialCash")}</b>
        <b> {cashFlowTranslation("cashFlow.dailyCashflow.totalIncomes")}</b>
        <b> {cashFlowTranslation("cashFlow.dailyCashflow.totalOutflow")}</b>
        <b> {cashFlowTranslation("cashFlow.dailyCashflow.result")}</b>
      </div>
      <div className="resultsContainer">
        <span className="btn btn-secondary btn-sm">
          <InitialDailyCash
            initialDailyCash={initialDailyCash}
            setInitialDailyCash={setInitialDailyCash}
          />
        </span>
        <b className="operators">+</b>
        <span>{sumCashIncomes}</span> <b className="operators">-</b>
        <span>{sumCashOutflow}</span> <b className="operators">=</b>
        <span>{resume}</span>
      </div>
    </div>
  );
};
export default DailyCashflow;

export async function getIncomes(dateSelected: string) {
  const incomeService = container.resolve(IncomeService);

  let incomes = await incomeService.getIncomesExtendedWithDate(dateSelected);

  return incomes;
}

export function filterIncomesExtendedList(
  incomesExtendedList: IIncomesExtended[]
) {
  let incomesWithoutFees = incomesExtendedList.filter((income) => {
    return income.incomeCategory.name !== "Cuotas";
  });
  return incomesWithoutFees;
}

export async function getViewFeesIncomes(dateSelected: string) {
  let dateParameter = dateSelected;
  let { data } = await supabase.rpc("view.incomeWhoPayed", {
    dateParameter,
  });
  return data;
}

export function cashIncomesFilter(incomesExtendedList: IIncomesExtended[]) {
  let cashIncomes = incomesExtendedList.filter((incomeExtendedList) =>
    incomeExtendedList.paymentMethod
      ? incomeExtendedList.paymentMethod.name === "Efectivo"
      : incomeExtendedList.paymentMethodName === "Efectivo"
  );
  return cashIncomes;
}

export async function getOutflows(dateSelected: string) {
  const outflowService = container.resolve(OutflowService);

  let outflows = await outflowService.getOutflowExtendedWithDate(dateSelected);
  return outflows;
}

export function sumIncomes(cashIncomes: IIncomesExtended[]) {
  let sumCashIncomes = cashIncomes.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
  return sumCashIncomes;
}

export function cashOutflowsFilter(outflowsExtendedList: IOutflowExtended[]) {
  let cashOutflows = outflowsExtendedList.filter(
    (outflowExtendedList) =>
      outflowExtendedList.paymentMethod.name === "Efectivo"
  );
  return cashOutflows;
}

export function sumOutflows(cashOutflows: IOutflowExtended[]) {
  let sumCashOutflows = cashOutflows.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
  return sumCashOutflows;
}

export function htmlBodyIncomes(
  incomesExtendedList: IIncomesExtended[],
  incomeArray: any
) {
  incomesExtendedList.forEach((income) => {
    const element = (
      <tr key={income.id}>
        <td>
          {income.incomeCategory
            ? income.incomeCategory.name
            : income.incomeCategoryName}
        </td>
        <td>${income.amount}</td>
        <td>
          {income.student ? (
            `${income.student.name + " " + income.student.surname}`
          ) : (
            <></>
          )}
        </td>
        <td>
          {income.incomeCategory
            ? income.paymentMethod.name
            : income.paymentMethodName}
        </td>
        <td className="detailsContainer"> {income.detail}</td>
      </tr>
    );
    incomeArray = incomeArray.concat(element);
  });
  return incomeArray;
}

export function htmlBodyOutflows(
  outflowsExtendedList: IOutflowExtended[],
  outflowArray: any
) {
  outflowsExtendedList.forEach((outflow) => {
    const element = (
      <tr key={outflow.id}>
        <td>{outflow.outflowCategory.name}</td>
        <td>${outflow.amount}</td>
        <td>{outflow.paymentMethod.name}</td>
        <td className="detailsContainer"> {outflow.detail}</td>
      </tr>
    );
    outflowArray = outflowArray.concat(element);
  });
  return outflowArray;
}
