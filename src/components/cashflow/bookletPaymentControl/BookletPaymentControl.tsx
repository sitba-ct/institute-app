import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import getSessionFromStorage from "../../../services/auth/SessionService";
import IIncomesExtended from "../../../services/income/IIncomesExtended";
import IIncomeCategory from "../../../services/income/incomeCategory/IIncomeCategory";
import IncomeCategory from "../../../services/income/incomeCategory/IncomeCategory";
import { IncomeService } from "../../../services/income/IncomeService";
import "./bookletPaymentControl.scss";
import SearchStudent from "./SearchStudent";
import { container } from "tsyringe";

const BookletPaymentControl = () => {
  const incomeService = container.resolve(IncomeService);

  const [incomeTranslation] = useTranslation("cashFlow");

  const [incomesCategorysList, setIncomesCategorysList] = useState<
    IIncomeCategory[]
  >([new IncomeCategory()]);
  const [incomeCategory, setIncomeCategory] = useState<IIncomeCategory>(
    new IncomeCategory()
  );
  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(true);
  const [student, setStudent] = useState<number>(0);
  const [incomes, setIncomes] = useState<IIncomesExtended[]>();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    initIncomeCategorysList();
    RoleBasedRoute();
  }, []);

  useEffect(() => {
    incomesFilterList();
  }, [student]);

  const initIncomeCategorysList = async () => {
    const incomeCategorysList = await incomeService.getIncomeCategorysList();
    setIncomesCategorysList(incomeCategorysList);
  };

  const showIncomes = async () => {
    var incomesForCategoryAndStudent =
      await incomeService.getStudentAndCategodyIncomes(
        incomeCategory.id,
        student
      );

    setIncomes(incomesForCategoryAndStudent);
  };
  const incomesFilterList = () => {
    incomes && student !== 0 ? (
      setIncomes(incomes.filter((income) => student === income.studentId))
    ) : (
      <></>
    );
  };

  const RoleBasedRoute = () => {
    let session = getSessionFromStorage();
    let hasUserRequiredRole = "";
    if (session) {
      let sessionAsObject = JSON.parse(session);
      hasUserRequiredRole = sessionAsObject.user.user_metadata.ken_role;
      setRole(hasUserRequiredRole);
    }
  };

  return (
    <div className="incomesContainer">
      <div className=" input-group mb-3">
        <select
          className="form-select"
          value={incomeCategory.id || ""}
          onChange={(e) => {
            setIncomeCategory({
              ...incomeCategory,
              id: Number(e.target.value),
            });
          }}
        >
          <option value={0 || ""}></option>
          {incomesCategorysList.map((category) =>
            role === "admin" ? (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ) : category.name === "Booklet" ? (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ) : (
              <option key={category.id} value={category.id} disabled>
                {category.name}
              </option>
            )
          )}
        </select>
        <button
          className="btn btn-primary "
          onClick={() => {
            showIncomes();
            setSaveButtonEnabled(false);
          }}
        >
          {incomeTranslation("cashFlow.bookletPaymentControl.search")}
        </button>
      </div>
      <div>
        {saveButtonEnabled ? <></> : <SearchStudent setStudent={setStudent} />}
      </div>
      {incomes ? (
        <div>
          <table className="table table-striped  incomesTable">
            <thead>
              <tr>
                <th className="border-0">
                  {incomeTranslation(
                    "cashFlow.bookletPaymentControl.incomesList.incomesList"
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="incomesList">
                <th className="col-1">
                  {incomeTranslation(
                    "cashFlow.bookletPaymentControl.incomesList.category"
                  )}
                </th>
                <th className="col-1">
                  {incomeTranslation(
                    "cashFlow.bookletPaymentControl.incomesList.surname"
                  )}
                </th>
                <th className="col-1">
                  {incomeTranslation(
                    "cashFlow.bookletPaymentControl.incomesList.name"
                  )}
                </th>
                <th className="col-1">
                  {incomeTranslation(
                    "cashFlow.bookletPaymentControl.incomesList.amount"
                  )}
                </th>
              </tr>
              {incomes.map((income) => {
                return (
                  <tr key={income.id}>
                    <td className="col-1">{income.incomeCategory.name}</td>
                    <td
                      className="col-1"
                      onClick={() => {
                        setStudent(income.studentId!);
                      }}
                    >
                      {income.student ? income.student.surname : ""}
                    </td>

                    <td className="col-1">
                      {income.student ? income.student.name : ""}
                    </td>
                    <td className="col-1">{income.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BookletPaymentControl;
