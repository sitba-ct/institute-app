import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import IIncome from "../../../../services/income/IIncome";
import IIncomeCategory from "../../../../services/income/incomeCategory/IIncomeCategory";
import IIncomeError from "../../../../services/income/validations/IIncomeError";
import IStudentBasicInfo from "../../../../services/students/BasicInfo/IBasicInfo";
import "./addIncome.scss";
import IPaymentMethod from "../../../../services/income/paymentMethods/IPaymentMethod";
import { useEffect, useState } from "react";
import ModalDropDownSearch from "./ModalDropDownSearch";

type props = {
  incomeCategory: IIncomeCategory[];
  income: IIncome;
  setIncome: React.Dispatch<React.SetStateAction<IIncome>>;
  errors: IIncomeError;
  setSaveButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStudentName: React.Dispatch<React.SetStateAction<boolean>>;
  showStudentName: boolean;
  students: IStudentBasicInfo[];
  paymentMethods: IPaymentMethod[];
};

const ModalIncome = (props: props) => {
  const [cashFlowTranslation] = useTranslation("cashFlow");

  const [results, setResults] = useState<IStudentBasicInfo[]>();
  const [selectedProfile, setSelectedProfile] = useState<IStudentBasicInfo>();

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setResults([]);

    const filteredValue = props.students.filter((profile) =>
      profile.name.toLowerCase().startsWith(target.value)
    );
    setResults(filteredValue);
  };

  useEffect(() => {
    selectedProfile ? (
      props.setIncome({
        ...props.income,
        studentId: Number(selectedProfile?.id),
      })
    ) : (
      <></>
    );
    props.setSaveButtonEnabled(false);
  }, [selectedProfile]);

  return (
    <div>
      <Form.Group className="incomeContainer ">
        <h6>{cashFlowTranslation("cashFlow.addIncome.amount")}</h6>
        <Form.Control
          type="number"
          name="amount"
          value={props.income.amount || ""}
          onChange={(event) => {
            props.setIncome({
              ...props.income,
              amount: Number(event.target.value),
            });
            props.setSaveButtonEnabled(false);
          }}
        />
        {props.errors.amount && (
          <p className="errorMessage">{props.errors.amount}</p>
        )}
        <h6>{cashFlowTranslation("cashFlow.addIncome.paymentMethod")}</h6>
        <div className="text-center ">
          <select
            className="form-select"
            onChange={(e) => {
              props.setIncome({
                ...props.income,
                paymentMethodId: Number(e.target.value),
              });
              props.setSaveButtonEnabled(false);
            }}
          >
            <option value={0}></option>
            {props.paymentMethods.map((paymentMethod) => (
              <option key={paymentMethod.id} value={paymentMethod.id}>
                {paymentMethod.name}
              </option>
            ))}
          </select>
        </div>
        {props.errors.paymentMethodId && (
          <p className="errorMessage">{props.errors.paymentMethodId}</p>
        )}
        <h6>{cashFlowTranslation("cashFlow.addIncome.dateRegistered")}</h6>
        <Form.Control
          type="Date"
          name="dateRegistered"
          value={props.income.dateRegistered.toLocaleDateString("fr-CA", {
            timeZone: "UTC",
          })}
          onChange={(event) => {
            props.setIncome({
              ...props.income,
              dateRegistered: new Date(event.target.value),
            });
            props.setSaveButtonEnabled(false);
          }}
        />
        {props.errors.dateRegistered && (
          <p className={"errorMessage"}>{props.errors.dateRegistered}</p>
        )}
        <h6>{cashFlowTranslation("cashFlow.addIncome.category")}</h6>
        <div className="text-center">
          <select
            className="form-select"
            onChange={(e) => {
              props.setIncome({
                ...props.income,
                incomeCategoryId: Number(e.target.value),
              });
              props.setSaveButtonEnabled(false);
            }}
          >
            <option value={0}></option>
            {props.incomeCategory.map((incomeCategory) =>
              incomeCategory.name === "Cuotas" ? (
                <option key={incomeCategory.id} value={1} disabled>
                  Course
                </option>
              ) : (
                <option key={incomeCategory.id} value={incomeCategory.id}>
                  {incomeCategory.name}
                </option>
              )
            )}
          </select>
        </div>
        {props.errors.incomeCategoryId && (
          <p className={"errorMessage"}>{props.errors.incomeCategoryId}</p>
        )}

        <div className="row">
          <div className="col pt-4">
            <ModalDropDownSearch
              results={results}
              value={`${selectedProfile?.name} ${selectedProfile?.surname}`}
              renderItem={(item) => (
                <p>
                  {item.name + "  "}
                  {item.surname}
                </p>
              )}
              onChange={handleChange}
              onSelect={(item) => setSelectedProfile(item)}
              showStudentName={props.showStudentName}
            />
            {props.errors.studentIncome && (
              <p className={"errorMessage"}>{props.errors.studentIncome}</p>
            )}
          </div>
          <div className="col pt-4  ">
            <p
              className="btn btn-primary  "
              onClick={() => {
                props.setShowStudentName(false);
              }}
            >
              {cashFlowTranslation("cashFlow.addIncome.chooseStudent")}
            </p>
          </div>
          <div className="form-group">
            <h6>{cashFlowTranslation("cashFlow.addIncome.detail")}:</h6>
            <textarea
              className="form-control"
              onChange={(e) => {
                props.setIncome({
                  ...props.income,
                  detail: e.target.value,
                });
              }}
            ></textarea>
          </div>
        </div>
      </Form.Group>
    </div>
  );
};

export default ModalIncome;
