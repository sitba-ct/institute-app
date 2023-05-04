import IStudent from "../../../services/students/IStudent";
import EditStudent from "../editStudent/editStudent";
import { useNavigate } from "react-router-dom";
import "../student.scss";
import AddStudent from "../addStudent/AddStudent";
import { useTranslation } from "react-i18next";

type editProps = {
  students: IStudent[];
  edit: Function;
  addStudent: Function;
};

const StudentSearch = (prop: editProps) => {
  const [studentsTranslation] = useTranslation("students");

  let navigate = useNavigate();

  return (
    <table className="table table-striped studentsTable">
      <thead>
        <tr>
          <th> {studentsTranslation("students.StudentSearch.students")}</th>
        </tr>
      </thead>
      <tbody>
        {prop.students.map((student) => {
          return (
            <tr key={student.id}>
              <td className="col-1">
                {student.groupId ? (
                  <button
                    className="btn btn-link"
                    onClick={() => {
                      navigate(`groupId/${student.groupId}`);
                    }}
                  >
                    {student.surname}
                  </button>
                ) : (
                  <button
                    className="btn btn-link text-nowrap"
                    onClick={() => {
                      navigate(`Id/${student.id}`);
                    }}
                  >
                    {student.surname}
                  </button>
                )}
              </td>
              <td className="">{student.name}</td>
              <td>
                <EditStudent
                  student={student}
                  edit={prop.edit}
                  students={prop.students}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <AddStudent students={prop.students} addStudent={prop.addStudent} />
      </tfoot>
    </table>
  );
};
export default StudentSearch;
