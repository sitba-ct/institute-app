import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GroupContext } from "../../../context/GroupContextProvider";
import IStudent from "../../../services/students/IStudent";
import IUnpayedAndFuturePeriods from "../../../services/students/studentDetail/IStudentUnpayedAndFuturePeriods";
import { StudentDetailService } from "../../../services/students/studentDetail/StudentDetailService";
import UnpayedAndFuturePeriods from "../../../services/students/studentDetail/StudentUnpayedAndFuturePeriods";
import { StudentService } from "../../../services/students/StudentService";
import "../groups.scss";
import "./groupStudents.scss";
import AddGroupStudent from "./AddGroupStudent";
import RemoveStudent from "./RemoveStudent";
import { container } from "tsyringe";

const StudentsGroup = () => {
  const group = useContext(GroupContext);

  const [groupsTranslation] = useTranslation("groups");

  const studentDetailService = container.resolve(StudentDetailService);
  const studentService = container.resolve(StudentService);

  const [groupStudents, setGroupStudents] = useState<IStudent[]>([]);
  const [studentGroupDetail, setStudentGroupDetail] =
    useState<IUnpayedAndFuturePeriods>(new UnpayedAndFuturePeriods());

  useEffect(() => {
    initStudentsGroup();
  }, [group]);

  useEffect(() => {
    groupStudents.length !== 0 ? initStudentGroupDetail() : <></>;
  }, [groupStudents]);

  const initStudentsGroup = async () => {
    var studentsGroups = await studentService.getStudentsGroup(group.group.id);
    setGroupStudents(studentsGroups);
  };

  const initStudentGroupDetail = async () => {
    // we get only one student detail from the group.
    // We know (we force) all students group share same fee state.
    let studentGroupDetail =
      await studentDetailService.processStudentUnpayedAndFuturePeriods(
        groupStudents[0].id
      );
    setStudentGroupDetail(studentGroupDetail);
  };

  function refreshStudentsGroup(RemoveStudent: number) {
    var filteredStudentsGroup = groupStudents.filter(
      (students) => students.id !== RemoveStudent
    );
    setGroupStudents(filteredStudentsGroup);
  }

  function addStudentToGroup(newStudent: IStudent) {
    const newStudentsList = [...groupStudents, newStudent];
    setGroupStudents(newStudentsList);
  }

  return (
    <table className="table table-striped groupsStudentsTable">
      <thead className="border-bottom">
        <tr className="border-dark rounded">
          <th>
            {groupsTranslation("groups.groupStudents.group")}
            {group.group.name}
          </th>
        </tr>
        <tr className="d-flex flex-row ">
          <th className="w-100 text-center me-5">
            {groupsTranslation("groups.groupStudents.names")}
          </th>
        </tr>
      </thead>
      <tbody>
        {groupStudents.map((student) => {
          return (
            <tr key={student.id} className="d-flex text-start">
              <td className="w-100   border-0 border-bottom text-end">
                {student.name}
              </td>
              <td className="w-100   border-0 border-bottom text-start">
                {student.surname}
              </td>
              <RemoveStudent
                student={student}
                refreshStudentsGroup={refreshStudentsGroup}
              />
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {group ? (
          <AddGroupStudent
            addStudentToGroup={addStudentToGroup}
            group={group.group}
            setStudentsGroup={setGroupStudents}
            studentGroupDetail={studentGroupDetail}
          />
        ) : (
          <></>
        )}
      </tfoot>
    </table>
  );
};
export default StudentsGroup;
