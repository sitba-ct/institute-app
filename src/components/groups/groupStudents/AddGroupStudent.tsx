import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import IGroup from "../../../services/group/IGroup";
import GroupErrorNewStudent from "../../../services/group/validations/GroupErrorNewStudent";
import { GroupValidationService } from "../../../services/group/validations/GroupValidationService";
import IGroupErrorNewStudent from "../../../services/group/validations/IGroupErrorNewStudent";
import IStudent from "../../../services/students/IStudent";
import IUnpayedAndFuturePeriods from "../../../services/students/studentDetail/IStudentUnpayedAndFuturePeriods";
import { StudentDetailService } from "../../../services/students/studentDetail/StudentDetailService";
import { StudentService } from "../../../services/students/StudentService";
import "../groups.scss";
import { container } from "tsyringe";

type props = {
  addStudentToGroup: Function;
  setStudentsGroup: React.Dispatch<React.SetStateAction<IStudent[]>>;
  group: IGroup;
  studentGroupDetail: IUnpayedAndFuturePeriods;
};

const AddGroupStudent = (props: props) => {
  const studentsService = container.resolve(StudentService);
  const groupValidationService = container.resolve(GroupValidationService);
  const studentDetailService = container.resolve(StudentDetailService);

  const [groupsTranslation] = useTranslation("groups");

  const [students, setStudents] = useState<IStudent[]>([]);
  const [studentId, setStudentId] = useState<number>();
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(true);
  const [loadingEnabled, setLoadingEnabled] = useState<boolean>(false);
  const [studentSelectedDetail, setStudentSelectedDetail] =
    useState<IUnpayedAndFuturePeriods>();

  const [errors, setErrors] = useState<IGroupErrorNewStudent>(
    new GroupErrorNewStudent()
  );

  useEffect(() => {
    initStudentsList();
  }, []);

  const initStudentsList = async () => {
    var studentsList = await studentsService.getStudentsWithoutGroup(
      props.group.id
    );
    setStudents(studentsList);
  };

  useEffect(() => {
    initStudentSelectedDetail();
  }, [studentId]);

  const initStudentSelectedDetail = async () => {
    if (studentId) {
      let studentSelectedDetail =
        await studentDetailService.processStudentUnpayedAndFuturePeriods(
          studentId
        );
      setStudentSelectedDetail(studentSelectedDetail);
      setLoadingEnabled(false);
    }
  };

  useEffect(() => {
    refreshErrors();
  }, [studentSelectedDetail]);

  const refreshErrors = async () => {
    // validation is only for groups that contain student.
    if (props.studentGroupDetail.futurePeriods[0].id === 0) {
      setSaveButtonDisabled(false);
    } else {
      let studentErrors = groupValidationService.validateNewStudentInGroup(
        studentSelectedDetail,
        props.studentGroupDetail
      );
      setErrors(studentErrors);
    }
  };

  useEffect(() => {
    if (Object.values(errors).every((x) => x === "")) {
      setSaveButtonDisabled(false);
      setLoadingEnabled(false);
    }
  }, [errors]);

  const AddStudentToGroup = async () => {
    if (studentId) {
      var studentInfo = await studentsService.addStudentToGroup(
        props.group.id,
        studentId
      );
      props.addStudentToGroup(studentInfo);
      RemovedStudentFromGroup(studentInfo);
      setShowModal(false);
    }
  };

  function RemovedStudentFromGroup(removedStudent: IStudent) {
    var filteredStudentsGroup = students.filter(
      (students) => students.id !== removedStudent.id
    );
    setStudents(filteredStudentsGroup);
  }

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <tr className="d-flex flex-row-reverse bd-highlight p-2 ">
      <td className="p-0 border-0 ">
        <button onClick={() => handleShow()} className="btn btn-success ">
          {groupsTranslation("groups.groupStudents.addStudent.addStudent")}
        </button>
      </td>

      <Modal show={showModal} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>
            {groupsTranslation("groups.groupStudents.addStudent.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <div className="">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th>
                    {groupsTranslation(
                      "groups.groupStudents.addStudent.students"
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  return (
                    <tr key={student.id}>
                      <td className="col-1">
                        <button
                          className="btn btn-link"
                          onClick={() => {
                            setStudentId(student.id);
                            setSaveButtonDisabled(true);
                            setErrors(new GroupErrorNewStudent());
                            setLoadingEnabled(true);
                          }}
                        >
                          {student.surname}
                        </button>
                      </td>
                      <td className="col-2">{student.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal.Body>

        {errors.groupId && (
          <p className="errorMessage  text-center">{errors.groupId}</p>
        )}
        <Modal.Footer>
          <Button onClick={handleClose}>
            {groupsTranslation("groups.groupStudents.addStudent.close")}
          </Button>

          {loadingEnabled ? (
            <button className="btn btn-success" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              {groupsTranslation("groups.groupStudents.addStudent.loading")}
            </button>
          ) : (
            <Button
              disabled={saveButtonDisabled}
              className="btn btn-success"
              onClick={() => {
                AddStudentToGroup();
                handleClose();
              }}
            >
              {groupsTranslation("groups.groupStudents.addStudent.saveChanges")}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default AddGroupStudent;
