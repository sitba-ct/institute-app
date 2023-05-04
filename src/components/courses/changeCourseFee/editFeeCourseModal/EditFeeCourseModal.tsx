import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { container } from "tsyringe";
import { CourseService } from "../../../../services/course/CourseService";
import { useEffect, useState } from "react";
import ICourseAndPeriods from "../../../../services/course/coursesAndPeriods/ICourseAndPeriods";
import ICoursePeriods from "../../../../services/course/periods/ICoursePeriods";
import { CourseValidationService } from "../../../../services/course/validations/CourseValidationService";
import IIncreaseError from "../../../../services/course/validations/IIncreaseError";
import IncreaseError from "../../../../services/course/validations/IncreaseError";
import "../changeCourseFee.scss";
import { useTranslation } from "react-i18next";
import { StudentDetailService } from "../../../../services/students/studentDetail/StudentDetailService";

type editProps = {
  selectedCoursePeriods: ICourseAndPeriods;
  initcoursesAndPeriods: Function;
  userRole: string | undefined;
};

const EditFeeCourseModal = (props: editProps) => {
  const [coursesTranslation] = useTranslation("courses");

  const courseService = container.resolve(CourseService);
  const courseValidationService = container.resolve(CourseValidationService);
  const studentDetailService = container.resolve(StudentDetailService);

  const [increase, setIncrease] = useState<number>(1);
  const [selectedCoursePeriods, setSelectedCoursePeriods] = useState<
    ICoursePeriods[]
  >(props.selectedCoursePeriods.coursePeriods);
  let currentPeriod: number;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(true);

  const [errors, setErrors] = useState<IIncreaseError>(new IncreaseError());

  const handleClose = () => {
    setShowModal(false);
    variablesReset();
  };
  const handleShow = () => {
    setShowModal(true);
    variablesReset();
  };

  const variablesReset = () => {
    setErrors(new IncreaseError());
    setIncrease(1);
    setSaveButtonEnabled(true);
  };

  const refreshErrors = (increaseNumber: number) => {
    let increaseFeeErrors =
      courseValidationService.validateIncreaseFee(increaseNumber);
    setErrors(increaseFeeErrors);
  };

  useEffect(() => {
    if (Object.values(errors).every((x) => x === "")) {
      setSaveButtonEnabled(false);
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  const incorporateIncreaceToFee = () => {
    selectedCoursePeriods.forEach(
      (coursePeriods) =>
        (coursePeriods.amountPay = Math.ceil(
          Math.ceil((coursePeriods.amountPay * increase) / 100) * 100
        ))
    );
    editCoursePeriod();
  };

  const editCoursePeriod = () => {
    selectedCoursePeriods.map(async (coursePeriods) =>
      coursePeriods.period <= currentPeriod ? (
        <></>
      ) : (
        await courseService.editCoursePeriod(
          coursePeriods.id,
          coursePeriods.amountPay
        )
      )
    );
    props.initcoursesAndPeriods();
    handleClose();
  };

  useEffect(() => {
    let ascendingSelectedCoursePeriods =
      props.selectedCoursePeriods.coursePeriods.sort(
        (a, b) => a.period - b.period
      );
    setSelectedCoursePeriods(ascendingSelectedCoursePeriods);
  }, [props.selectedCoursePeriods]);

  const initCurrentPeriod = () => {
    currentPeriod = studentDetailService.processCurrentPeriod(
      new Date(`"${props.selectedCoursePeriods.startDate}"`)
    );
  };

  return (
    <td className="ps-0">
      <td id="changeCourseFeeTable-end">
        <Button
          onClick={() => {
            handleShow();
            setIncrease(1);
            initCurrentPeriod();
          }}
          className={
            props.userRole === "admin"
              ? "btn btn-primary"
              : "btn btn-primary disabled"
          }
        >
          {coursesTranslation(
            "courses.changeCourseFee.editFeeCourseModal.edit"
          )}
        </Button>
      </td>
      <Modal show={showModal} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className=" ">
            <tbody>
              <tr className=" border-bottom border-dark rounded fw-bold text-black text-start">
                <td>
                  {coursesTranslation(
                    "courses.changeCourseFee.editFeeCourseModal.selectFeeIncrease"
                  )}
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setSaveButtonEnabled(false);
                      setIncrease(1.05);
                      setErrors(new IncreaseError(""));
                    }}
                    className={
                      increase === 1.05
                        ? "btn btn-secondary  m-3"
                        : "btn btn-light  border-bottom border-dark rounded  m-3"
                    }
                  >
                    5%
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setSaveButtonEnabled(false);
                      setIncrease(1.1);
                      setErrors(new IncreaseError(""));
                    }}
                    className={
                      increase === 1.1
                        ? "btn btn-secondary m-3"
                        : "btn btn-light  border-bottom border-dark rounded m-3"
                    }
                  >
                    10%
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setSaveButtonEnabled(false);
                      setIncrease(1.15);
                      setErrors(new IncreaseError(""));
                    }}
                    className={
                      increase === 1.15
                        ? "btn btn-secondary m-3"
                        : "btn btn-light  border-bottom border-dark rounded m-3"
                    }
                  >
                    15%
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setSaveButtonEnabled(false);
                      setIncrease(1.2);
                      setErrors(new IncreaseError(""));
                    }}
                    className={
                      increase === 1.2
                        ? "btn btn-secondary m-3"
                        : "btn btn-light  border-bottom border-dark rounded m-3 "
                    }
                  >
                    20%
                  </Button>
                </td>
                <td>
                  <input
                    type="percentage"
                    // value={increase === 1.1 ? "" : increase + "%"}
                    onClick={() => {
                      setIncrease(1);
                      setSaveButtonEnabled(true);
                    }}
                    onChange={(e) => {
                      refreshErrors(Number(e.target.value));
                      setIncrease(1 + Number(e.target.value) / 100);
                    }}
                    className={"inputFeeIncrease"}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table table-striped text-center ">
            <thead>
              <tr>
                <th className="">
                  {coursesTranslation(
                    "courses.changeCourseFee.editFeeCourseModal.course"
                  )}
                </th>
                <th className="">1</th>
                <th className="">2</th>
                <th className="">3</th>
                <th className="">4</th>
                <th className="">5</th>
                <th className="">6</th>
                <th className="">7</th>
                <th className="">8</th>
                <th className="">9</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"> {props.selectedCoursePeriods.name}</th>
                {selectedCoursePeriods.map((coursePeriods, index) => {
                  return coursePeriods.period <= currentPeriod ? (
                    <td key={index}>
                      <button
                        className={"btn btn-outline-secondary p-1 "}
                        disabled={true}
                      >
                        ${coursePeriods.amountPay}
                      </button>
                    </td>
                  ) : (
                    <td key={index}>
                      <p
                        className={"mb-0"}
                        // className={
                        //   //this conditional is thinking of adding a new option
                        //   //can select the period and only sum the increase in that fee and not in all of them
                        //   coursePeriods.isSelected === true
                        //     ? " bg-success text-black  bg-opacity-50 border border-dark cursor border-2 d-flex "
                        //     : " btn btn-primary p-1"
                        // }
                      >
                        $
                        {Math.ceil((coursePeriods.amountPay * increase) / 100) *
                          100}
                      </p>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          {errors.increase && (
            <p className="errorMessage text-center">{errors.increase}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            {coursesTranslation(
              "courses.changeCourseFee.editFeeCourseModal.close"
            )}
          </Button>
          <Button
            className="btn btn-success"
            disabled={saveButtonEnabled}
            onClick={() => {
              incorporateIncreaceToFee();
            }}
          >
            {coursesTranslation(
              "courses.changeCourseFee.editFeeCourseModal.saveChanges"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </td>
  );
};

export default EditFeeCourseModal;
