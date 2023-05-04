import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { container } from "tsyringe";
import { CourseService } from "../../../services/course/CourseService";
import ICourse from "../../../services/course/ICourse";
import { useEffect, useState } from "react";
import { CourseValidationService } from "../../../services/course/validations/CourseValidationService";
import ICourseError from "../../../services/course/validations/ICourseError";
import CourseError from "../../../services/course/validations/CourseError";
import "../courses.scss";
import { useTranslation } from "react-i18next";

type editProps = {
  courseSelected: ICourse;
  onSuccessCourseEdit: Function;
  courses: ICourse[];
  userRole: string | undefined;
};

const EditCourse = (props: editProps) => {
  const courseService = container.resolve(CourseService);
  const courseValidationService = container.resolve(CourseValidationService);

  const [coursesTranslation] = useTranslation("courses");
  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);

  const [newName, setNewName] = useState<string>("");
  const [newStartDate, setNewStartDate] = useState<Date>(new Date());
  const [newInitialFee, setNewInitialFee] = useState<number>(0);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [errors, setErrors] = useState<ICourseError>(new CourseError());

  const editCourse = async () => {
    var courseEditObject = await courseService.EditCourse(
      newName,
      newStartDate,
      newInitialFee,
      props.courseSelected.id
    );
    props.onSuccessCourseEdit(courseEditObject);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
    variablesReset();
  };

  const variablesReset = () => {
    setNewName("");
    setNewStartDate(new Date(props.courseSelected.startDate));
    setNewInitialFee(0);
    setErrors(new CourseError());
  };

  const refreshErrors = () => {
    let studentErrors = courseValidationService.validateEditCourse(
      newName,
      newStartDate,
      newInitialFee,
      props.courses,
      coursesTranslation
    );
    setErrors(studentErrors);
  };

  useEffect(() => {
    if (Object.values(errors).every((x) => x === "")) {
      editCourse();
      handleClose();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  return (
    <>
      <Button
        onClick={() => {
          handleShow();
          setNewName(props.courseSelected.name);
          setNewInitialFee(props.courseSelected.initialFee);
        }}
        className={
          props.userRole === "admin"
            ? "btn btn-primary "
            : "btn btn-primary disabled"
        }
      >
        {coursesTranslation("courses.listCourses.addCourseAndEditCourse.edit")}
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {coursesTranslation(
              "courses.listCourses.addCourseAndEditCourse.editCourse"
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <label className="padding-top:1">
                {coursesTranslation(
                  "courses.listCourses.addCourseAndEditCourse.name"
                )}
              </label>

              <Form.Control
                type="string"
                name="newName"
                value={newName}
                onChange={(event) => {
                  setNewName(event.target.value);
                  setSaveButtonEnabled(false);
                }}
              />
              {errors.name && <p className="errorMessage">{errors.name}</p>}
              <label className="mt-2">
                {coursesTranslation(
                  "courses.listCourses.addCourseAndEditCourse.startDate"
                )}
              </label>
              <Form.Control
                type="Date"
                name="startDate"
                value={new Date(newStartDate).toLocaleDateString("fr-CA", {
                  timeZone: "UTC",
                })}
                onChange={(event) => {
                  setNewStartDate(new Date(event.target.value));
                  setSaveButtonEnabled(false);
                }}
              />
              {errors.startDate && (
                <p className="errorMessage">{errors.startDate}</p>
              )}
              {/* <label className="mt-2">
                {coursesTranslation(
                  "courses.listCourses.addCourseAndEditCourse.initialFee"
                )}
              </label>
              <Form.Control
                type="number"
                name="initialFee"
                value={newInitialFee || ""}
                onChange={(event) => {
                  setNewInitialFee(Number(event.target.value));
                  setSaveButtonEnabled(false);
                }}
              />
              {errors.initialFee && (
                <p className="errorMessage">{errors.initialFee}</p>
              )} */}
              <label className="mt-2">
                {coursesTranslation(
                  "courses.listCourses.addCourseAndEditCourse.duration"
                )}
              </label>
              <Form.Control
                type="number"
                name="duration"
                disabled={true}
                autoFocus
                value={9}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            {coursesTranslation(
              "courses.listCourses.addCourseAndEditCourse.close"
            )}
          </Button>
          <Button onClick={() => refreshErrors()} className="btn btn-success">
            {coursesTranslation(
              "courses.listCourses.addCourseAndEditCourse.saveChanges"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCourse;
