import { useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ICourse from "../../../services/course/ICourse";
import IGroup from "../../../services/group/IGroup";
import IStudent from "../../../services/students/IStudent";
import IStudentError from "../../../services/students/validations/IStudentError";
import "./studentModal.scss";

type variables = {
  student: IStudent;
  setStudent: Function;
  courses: ICourse[];
  groups: IGroup[];
  errors: IStudentError;
  setSaveButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  courseStartedDate: Date;
  setCourseStartedDate: React.Dispatch<React.SetStateAction<Date>>;
};

const StudentModal = (variables: variables) => {
  const [showStudentStartedDate, setShowStudentStartedDate] =
    useState<boolean>(true);

  const [studentsTranslation] = useTranslation("students");

  return (
    <>
      <Form.Group className="container ">
        <h5 className="">{studentsTranslation("students.edit-add.Student")}</h5>
        <div className="row">
          <div className="col-sm-4">
            <h6 className="text-center">
              {studentsTranslation("students.edit-add.Name")}
            </h6>
            <Form.Control
              type="string"
              name="Name"
              value={variables.student.name}
              onChange={(event) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  name: event.target.value,
                });
              }}
              autoFocus
            />
            {variables.errors.name && (
              <p className="errorMessage">{variables.errors.name}</p>
            )}
          </div>

          <div className="col-sm-4">
            <h6 className="text-center">
              {studentsTranslation("students.edit-add.Surname")}
            </h6>
            <Form.Control
              type="string"
              name="Surname"
              value={variables.student.surname}
              autoFocus
              onChange={(event) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  surname: event.target.value,
                });
              }}
            />
            {variables.errors.surname && (
              <p className="errorMessage">{variables.errors.surname}</p>
            )}
          </div>

          <div className="col-sm-4">
            <h6 className="text-center">DNI</h6>
            <Form.Control
              type="number"
              name="DNI"
              autoFocus
              value={variables.student.DNI || ""}
              onChange={(event) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  DNI: Number(event.target.value),
                });
              }}
            />
            {variables.errors.DNI && (
              <p className="errorMessage">{variables.errors.DNI}</p>
            )}
          </div>
        </div>

        <div className="row mt-2 ">
          <div className="col-sm-5 ">
            <h6 className="text-center">
              {studentsTranslation("students.edit-add.BirthDay")}
            </h6>
            <Form.Control
              type="Date"
              name="birthDay"
              autoFocus
              value={new Date(variables.student.datebirth).toLocaleDateString(
                "fr-CA",
                {
                  timeZone: "UTC",
                }
              )}
              onChange={(event) => {
                variables.setStudent({
                  ...variables.student,
                  datebirth: new Date(event.target.value),
                });
                variables.setSaveButtonEnabled(false);
              }}
            />
            {variables.errors.datebirth && (
              <p className="errorMessage">{variables.errors.datebirth}</p>
            )}
          </div>
          <div className="col-sm-4 text-center">
            <h6>{studentsTranslation("students.edit-add.Course")}</h6>
            <select
              className="form-select"
              value={variables.student.courseId || ""}
              disabled={false}
              onChange={(e) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  courseId: Number(e.target.value),
                });
              }}
            >
              <option value={0 || ""}>Choose Course</option>
              {variables.courses.map((course) => (
                <option key={course.id} value={course.id || ""}>
                  {course.name}
                </option>
              ))}
            </select>
            {variables.errors.courseId && (
              <p className="errorMessage">{variables.errors.courseId}</p>
            )}
          </div>
          {/* <div className="col-sm-4 text-center">
            <h6>Group</h6>
            <select
              className="form-select"
              value={variables.student.groupId || ""}
              disabled={true}
              onChange={(e) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  groupId: Number(e.target.value),
                });
              }}
            >
              <option value={0 || ""}>No Group</option>
              {variables.groups.map((group) => (
                <option key={group.id} value={group.id || ""}>
                  {group.name}
                </option>
              ))}
            </select>
            <p className="groupText p-0 m-0">change to sidebar group</p>
          </div> */}
        </div>
        <div className="row">
          <div className="col-sm-4 pe-0 mt-1 pt-3">
            <Form.Control
              type="Date"
              name="studentStartDate"
              value={new Date(
                variables.student.courseStartedDate
              ).toLocaleDateString("fr-CA", {
                timeZone: "UTC",
              })}
              autoFocus
              disabled={showStudentStartedDate}
              onChange={(event) => {
                variables.setStudent({
                  ...variables.student,
                  courseStartedDate: new Date(event.target.value),
                });
                variables.setSaveButtonEnabled(false);
              }}
            />
            {variables.errors.courseStartedDate && (
              <p className="errorMessage">
                {variables.errors.courseStartedDate}
              </p>
            )}
          </div>
          <div className="col-sm-4 ps-0">
            <p
              className="btn btn-primary  buttonEntryLate"
              onClick={() => {
                setShowStudentStartedDate(false);
              }}
            >
              {studentsTranslation("students.edit-add.late-entry")}
            </p>
          </div>
        </div>
        <h5 className="">{studentsTranslation("students.edit-add.Contact")}</h5>
        <div className="row">
          <div className="col-sm-4">
            <h6 className="text-center">
              {studentsTranslation("students.edit-add.phone")}
            </h6>
            <Form.Control
              type="number"
              name="phonenumber"
              value={variables.student.phonenumber || ""}
              onChange={(event) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  phonenumber: Number(event.target.value),
                });
              }}
              autoFocus
            />
            {variables.errors.phonenumber && (
              <p className="errorMessage">{variables.errors.phonenumber}</p>
            )}
          </div>
          <div className="col-sm-4 ">
            <h6 className="text-center">Email</h6>
            <Form.Control
              type="string"
              name="Email"
              autoFocus
              value={variables.student.email}
              onChange={(event) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  email: event.target.value,
                });
              }}
            />
            {variables.errors.email && (
              <p className="errorMessage">{variables.errors.email}</p>
            )}
          </div>
          <div className="col-sm-4 ">
            <h6 className="text-center">
              {studentsTranslation("students.edit-add.address")}
            </h6>
            <Form.Control
              type="string"
              name="direction"
              value={variables.student.direction}
              onChange={(event) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  direction: event.target.value,
                });
              }}
              autoFocus
            />
            {variables.errors.direction && (
              <p className="errorMessage">{variables.errors.direction}</p>
            )}
          </div>
        </div>
        <h5 className="mt-2 ">
          {studentsTranslation("students.edit-add.School-Information")}
        </h5>
        <div className="row">
          <div className="col-sm-5 ">
            <h6 className="text-center">
              {studentsTranslation("students.edit-add.School-Name")}
            </h6>
            <Form.Control
              type="string"
              name="school Name"
              autoFocus
              value={variables.student.schoolName}
              onChange={(event) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  schoolName: event.target.value,
                });
              }}
            />
            {variables.errors.schoolName && (
              <p className="errorMessage">{variables.errors.schoolName}</p>
            )}
          </div>
          <div className="col-sm-4 ">
            <h6 className="text-center">
              {studentsTranslation("students.edit-add.School-Turn")}
            </h6>
            <Form.Control
              type="string"
              name="school Turn"
              autoFocus
              value={variables.student.schoolTurn}
              onChange={(event) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  schoolTurn: event.target.value,
                });
              }}
            />
            {variables.errors.schoolTurn && (
              <p className="errorMessage">{variables.errors.schoolTurn}</p>
            )}
          </div>
        </div>
        <h5 className="mt-2">
          {studentsTranslation("students.edit-add.Parent-Information")}
        </h5>
        <div className="row ">
          <div className="col-sm-4 ">
            <h6 className="text-center">
              {studentsTranslation("students.edit-add.Name")}
            </h6>
            <Form.Control
              type="string"
              name="parent name"
              autoFocus
              value={variables.student.parentName}
              onChange={(event) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  parentName: event.target.value,
                });
              }}
            />
            {variables.errors.parentName && (
              <p className="errorMessage">{variables.errors.parentName}</p>
            )}
          </div>
          <div className="col-sm-4 ">
            <h6 className="text-center">DNI</h6>
            <Form.Control
              type="number"
              name="DNI"
              autoFocus
              value={variables.student.parentDNI || ""}
              onChange={(event) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  parentDNI: Number(event.target.value),
                });
              }}
            />
            {variables.errors.parentDNI && (
              <p className="errorMessage">{variables.errors.parentDNI}</p>
            )}
          </div>
          <div className="col-sm-4 ">
            <h6 className="text-center">CUIT</h6>
            <Form.Control
              type="string"
              name="CUIT"
              autoFocus
              value={variables.student.CUIT || ""}
              onChange={(event) => {
                variables.setSaveButtonEnabled(false);
                variables.setStudent({
                  ...variables.student,
                  CUIT: Number(event.target.value),
                });
              }}
            />
            {variables.errors.CUIT && (
              <p className="errorMessage">{variables.errors.CUIT}</p>
            )}
          </div>
        </div>
      </Form.Group>
    </>
  );
};

export default StudentModal;
