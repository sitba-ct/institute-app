import { useState } from "react";
import Button from "react-bootstrap/Button";
import IStudent from "../../services/students/IStudent";
import { StudentService } from "../../services/students/StudentService";
import StudentSearch from "./StudentSearch/StudentSearch";
import "./student.scss";
import { useTranslation } from "react-i18next";
import { container } from "tsyringe";

const Student = () => {
  const [studentsTranslation] = useTranslation("students");

  const studentService = container.resolve(StudentService);

  const [students, setStudents] = useState<IStudent[]>([]);

  const [searchStudent, setSearchStudent] = useState<string>("");

  const inputStudentSearch = async (surname: string) => {
    var students = await studentService.get(surname);
    setStudents(students);
  };

  const addStudent = async (newStudent: IStudent[]) => {
    setStudents(newStudent);
  };

  const edit = async (students: IStudent[]) => {
    setStudents(students);
  };

  return (
    <div className="studentContainer">
      <h4>{studentsTranslation("students.searchStudents")}</h4>

      <div className=" input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
          placeholder={studentsTranslation("students.surname")!}
        />
        <Button
          onClick={() => {
            inputStudentSearch(searchStudent);
          }}
          className="btn btn btn-primary"
          type="button"
          id="button-addon2"
        >
          {studentsTranslation("students.search")}
        </Button>
      </div>
      {students.length > 0 ? (
        <StudentSearch
          students={students}
          edit={edit}
          addStudent={addStudent}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Student;
