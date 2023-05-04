import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import IOutflow from "../../../../services/outflow/IOutflow";
import IOutflowCategory from "../../../../services/outflow/outflowCategory/IOutflowCategory";
import IOutflowError from "../../../../services/outflow/validations/IOutflowError";
import "./addOutflow.scss";
import IPaymentMethod from "../../../../services/income/paymentMethods/IPaymentMethod";

type props = {
  outflowCategory: IOutflowCategory[];
  outflow: IOutflow;
  setOutflow: Function;
  errors: IOutflowError;
  setSaveButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  paymentMethods: IPaymentMethod[];
};

const ModalOutflow = (props: props) => {
  const [cashFlowTranslation] = useTranslation("cashFlow");

  return (
    <div>
      <Form.Group className="outflowContainer ">
        <h6>{cashFlowTranslation("cashFlow.addOutflow.amount")}</h6>
        <Form.Control
          type="number"
          name="amount"
          value={props.outflow.amount || ""}
          onChange={(event) => {
            props.setOutflow({
              ...props.outflow,
              amount: event.target.value,
            });
            props.setSaveButtonEnabled(false);
          }}
        />
        {props.errors.amount && (
          <p className="errorMessage">{props.errors.amount}</p>
        )}
        <h6>{cashFlowTranslation("cashFlow.addOutflow.paymentMethod")}</h6>
        <div className="text-center">
          <select
            className="form-select"
            onChange={(e) => {
              props.setOutflow({
                ...props.outflow,
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
          <p className={"errorMessage"}>{props.errors.paymentMethodId}</p>
        </div>
        <h6>{cashFlowTranslation("cashFlow.addOutflow.dateRegistered")}</h6>
        <Form.Control
          type="Date"
          name="dateRegistered"
          value={props.outflow.dateRegistered.toLocaleDateString("fr-CA", {
            timeZone: "UTC",
          })}
          onChange={(event) => {
            props.setSaveButtonEnabled(false);
            props.setOutflow({
              ...props.outflow,
              dateRegistered: new Date(event.target.value),
            });
          }}
        />
        {props.errors.dateRegistered && (
          <p className={"errorMessage"}>{props.errors.dateRegistered}</p>
        )}
        <h6>{cashFlowTranslation("cashFlow.addOutflow.category")}</h6>
        <div className="text-center">
          <select
            className="form-select"
            onChange={(e) => {
              props.setSaveButtonEnabled(false);

              props.setOutflow({
                ...props.outflow,
                outflowCategoryId: Number(e.target.value),
              });
            }}
          >
            <option value={0}></option>
            {props.outflowCategory.map((outflowCategory) =>
              outflowCategory.name === "Course" ? (
                <option key={outflowCategory.id} value={1} disabled>
                  {cashFlowTranslation("cashFlow.addOutflow.course")}
                </option>
              ) : (
                <option key={outflowCategory.id} value={outflowCategory.id}>
                  {outflowCategory.name}
                </option>
              )
            )}
          </select>
        </div>
        {props.errors.outflowCategoryId && (
          <p className={"errorMessage"}>{props.errors.outflowCategoryId}</p>
        )}
        <div className="form-group">
          <h6>{cashFlowTranslation("cashFlow.addOutflow.detail")}</h6>
          <textarea
            className="form-control"
            onChange={(e) => {
              props.setSaveButtonEnabled(false);

              props.setOutflow({
                ...props.outflow,
                detail: e.target.value,
              });
            }}
          ></textarea>
        </div>
      </Form.Group>
    </div>
  );
};

export default ModalOutflow;
