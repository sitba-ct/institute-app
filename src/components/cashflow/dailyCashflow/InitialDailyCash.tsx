import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import IInitialCashPerDay from "../../../services/initialDailyCash/IInitialCashPerDay";
import InitialCashPerDay from "../../../services/initialDailyCash/InitialCashPerDay";
import { InitialCashPerDayService } from "../../../services/initialDailyCash/InitialCashPerDayService";
import { IInitialCashPerDayError } from "../../../services/initialDailyCash/validations/IInitialCashPerDayError";
import InitialCashPerDayError from "../../../services/initialDailyCash/validations/InitialCashPerDayError";
import { InitialCashPerDayValidaionService } from "../../../services/initialDailyCash/validations/InitialCashPerDayValidaionService";
import { container } from "tsyringe";

type props = {
  initialDailyCash: number;
  setInitialDailyCash: React.Dispatch<React.SetStateAction<number>>;
};

const InitialDailyCash = (props: props) => {
  const initialCashPerDayService = container.resolve(InitialCashPerDayService);
  const initialCashPerDayValidaionService = container.resolve(
    InitialCashPerDayValidaionService
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cashFlowTranslation] = useTranslation("cashFlow");
  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(true);

  const [errors, setErrors] = useState<IInitialCashPerDayError>(
    new InitialCashPerDayError()
  );

  const [initialDailyCash, setInitialDailyCash] = useState<IInitialCashPerDay>(
    new InitialCashPerDay()
  );

  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    variablesReset();
  };

  const variablesReset = () => {
    setErrors({ date: "", initialCash: undefined });
    setInitialDailyCash(new InitialCashPerDay());
  };

  useEffect(() => {
    if (Object.values(errors).every((x) => x === "")) {
      saveAmount();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  const saveAmount = async () => {
    const returnPost = await initialCashPerDayService.saveAmount(
      initialDailyCash
    );
    props.setInitialDailyCash(returnPost[returnPost.length - 1].amount);
    handleClose();
  };

  const errorValidate = async () => {
    let errors =
      await initialCashPerDayValidaionService.validateInitialCashPerDay(
        initialDailyCash
      );
    setErrors(errors);
  };

  return (
    <div>
      <div onClick={() => handleShow()} className="w-100 h-100">
        {props.initialDailyCash}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cashFlowTranslation(
              "cashFlow.dailyCashflow.initialDailyCash.initialDailyCash"
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Form>
            <h6>
              {cashFlowTranslation(
                "cashFlow.dailyCashflow.initialDailyCash.date"
              )}
            </h6>
            <Form.Control
              type="Date"
              name="date"
              value={initialDailyCash.date.toLocaleDateString("fr-CA", {
                timeZone: "UTC",
              })}
              disabled={true}
              onChange={(event) => {
                setInitialDailyCash({
                  ...initialDailyCash,
                  date: new Date(event.target.value),
                });
                setSaveButtonEnabled(false);
              }}
            />

            {errors.date && <p className="errorMessage">{errors.date}</p>}
          </Form>
          <Form>
            <h6>
              {cashFlowTranslation(
                "cashFlow.dailyCashflow.initialDailyCash.cashAmount"
              )}
            </h6>
            <Form.Control
              type="number"
              name="cashAmount"
              value={initialDailyCash.amount || ""}
              onChange={(event) => {
                setInitialDailyCash({
                  ...initialDailyCash,
                  amount: Number(event.target.value),
                });
                setSaveButtonEnabled(false);
              }}
            />
            {errors.initialCash && (
              <p className="errorMessage">{errors.initialCash}</p>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            {cashFlowTranslation(
              "cashFlow.dailyCashflow.initialDailyCash.close"
            )}
          </Button>
          <Button
            onClick={() => {
              errorValidate();
            }}
            className="btn btn-success"
            disabled={saveButtonEnabled}
          >
            {cashFlowTranslation(
              "cashFlow.dailyCashflow.initialDailyCash.save"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InitialDailyCash;
