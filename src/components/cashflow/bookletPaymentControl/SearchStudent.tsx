import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import IStudent from "../../../services/students/IStudent";
import { StudentService } from "../../../services/students/StudentService";
import "./bookletPaymentControl.scss";
import { container } from "tsyringe";

type props = {
  setStudent: Dispatch<SetStateAction<number>>;
};

const SearchStudent = (props: props) => {
  const studentsService = container.resolve(StudentService);

  const [incomeTranslation] = useTranslation("cashFlow");

  const [searchStudent, setSearchStudent] = useState<string>("");
  const [students, setStudents] = useState<IStudent[]>();

  const inputStudentSearch = async (surname: string) => {
    var students = await studentsService.get(surname);
    setStudents(students);
  };

  return (
    <div>
      <div className=" input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
          placeholder={
            incomeTranslation("cashFlow.bookletPaymentControl.surname")!
          }
        />
        <Button
          onClick={() => {
            props.setStudent(0);
            setSearchStudent("");
            setStudents(undefined);
          }}
          className="btn btn-danger"
          type="button"
          id=""
        >
          {incomeTranslation(
            "cashFlow.bookletPaymentControl.searchStudent.delete"
          )}{" "}
        </Button>
        <Button
          onClick={() => {
            inputStudentSearch(searchStudent);
          }}
          className="btn btn-primary"
          type="button"
          id="button-addon2"
        >
          {incomeTranslation("cashFlow.bookletPaymentControl.search")}
        </Button>
      </div>
      {students ? (
        <table className="table table-striped searchTable">
          <thead>
            <tr>
              <th className="border-0">
                {incomeTranslation(
                  "cashFlow.bookletPaymentControl.searchStudent.studentsList"
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
                        props.setStudent(student.id);
                        setSearchStudent(student.surname + " " + student.name);
                      }}
                    >
                      {student.surname}
                    </button>
                  </td>
                  <td className="">{student.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchStudent;
