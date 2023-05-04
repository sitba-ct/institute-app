import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CourseService } from "../../../services/course/CourseService";
import ICourse from "../../../services/course/ICourse";
import { useEffect, useState } from "react";
import { CourseValidationService } from "../../../services/course/validations/CourseValidationService";
import ICourseError from "../../../services/course/validations/ICourseError";
import CourseError from "../../../services/course/validations/CourseError";
import { container } from "tsyringe";
import "../courses.scss";
import { useTranslation } from "react-i18next";

type AddProps = {
  courseAdd: Function;
  courses: ICourse[];
  userRole: string | undefined;
};

const AddCourse = (props: AddProps) => {
  const courseService = container.resolve(CourseService);
  const courseValidationService = container.resolve(CourseValidationService);

  const [coursesTranslation] = useTranslation("courses");

  const [saveButtonEnabled, setSaveButtonEnabled] = useState<boolean>(false);

  const [newName, setNewName] = useState<string>("");
  const [newStartDate, setNewStartDate] = useState<Date>(new Date());
  const [newInitialFee, setNewInitialFee] = useState<number>(0);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [errors, setErrors] = useState<ICourseError>(new CourseError());

  const addNewCourse = async () => {
    let newCourseObject = await courseService.AddCourse(
      newName,
      newStartDate,
      newInitialFee
    );

    let newCourse = [...props.courses, newCourseObject];
    props.courseAdd(newCourse);
    addCoursePeriod(newCourseObject.id);
  };

  const addCoursePeriod = async (newCourseObject: number) => {
    await courseService.addCoursePeriod(newInitialFee, newCourseObject);
    let newCourse = [...props.courses, newCourseObject];
    props.courseAdd(newCourse);
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
    setNewStartDate(new Date());
    setNewInitialFee(0);
    setErrors(new CourseError());
  };

  const refreshErrors = () => {
    let studentErrors = courseValidationService.validateAddCourse(
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
      addNewCourse();
      handleClose();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  return (
    <tr>
      <td className="border border-0">
        <Button
          onClick={handleShow}
          className={
            props.userRole === "admin"
              ? "btn btn-success "
              : "btn btn-success disabled"
          }
        >
          {coursesTranslation("courses.listCourses.addCourseAndEditCourse.add")}
        </Button>
      </td>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {coursesTranslation(
              "courses.listCourses.addCourseAndEditCourse.new"
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
                placeholder="Enter New Course"
                type="string"
                name="newName"
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
                placeholder="Enter new startDate"
                type="Date"
                value={newStartDate.toLocaleDateString("fr-CA", {
                  timeZone: "UTC",
                })}
                name="startDate"
                onChange={(event) => {
                  setNewStartDate(new Date(event.target.value));
                  setSaveButtonEnabled(false);
                }}
              />
              {errors.startDate && (
                <p className="errorMessage">{errors.startDate}</p>
              )}
              <label className="mt-2">
                {coursesTranslation(
                  "courses.listCourses.addCourseAndEditCourse.initialFee"
                )}
              </label>
              <Form.Control
                placeholder="Enter initialFee"
                type="number"
                name="initialFee"
                onChange={(event) => {
                  setNewInitialFee(Number(event.target.value));
                  setSaveButtonEnabled(false);
                }}
                autoFocus
              />
              {errors.initialFee && (
                <p className="errorMessage">{errors.initialFee}</p>
              )}
              <label className="mt-2">
                {coursesTranslation(
                  "courses.listCourses.addCourseAndEditCourse.duration"
                )}
              </label>
              <Form.Control
                placeholder="Enter duration"
                type="number"
                name="duration"
                autoFocus
                value={9}
                disabled={true}
              />
              {errors.duration && (
                <p className="errorMessage">{errors.duration}</p>
              )}
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
    </tr>
  );
};

export default AddCourse;
