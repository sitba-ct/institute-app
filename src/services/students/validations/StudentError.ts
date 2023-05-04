import IStudentError from "./IStudentError";

export default class StudentError implements IStudentError {
  constructor(
    id: string | undefined = "",
    name: string | undefined = undefined,
    courseId: string | undefined = undefined,
    groupId: string | undefined = "",
    direction: string | undefined = undefined,
    phonenumber: string | undefined = undefined,
    email: string | undefined = undefined,
    DNI: string | undefined = undefined,
    datebirth: string | undefined = "",
    parentName: string | undefined = undefined,
    parentDNI: string | undefined = undefined,
    schoolName: string | undefined = "",
    schoolTurn: string | undefined = "",
    surname: string | undefined = undefined,
    CUIT: string | undefined = undefined,
    courseStartedDate: string | undefined = ""
  ) {
    this.id = id;
    this.name = name;
    this.courseId = courseId;
    this.groupId = groupId;
    this.direction = direction;
    this.phonenumber = phonenumber;
    this.email = email;
    this.DNI = DNI;
    this.parentName = parentName;
    this.parentDNI = parentDNI;
    this.datebirth = datebirth;
    this.schoolName = schoolName;
    this.schoolTurn = schoolTurn;
    this.surname = surname;
    this.CUIT = CUIT;
    this.courseStartedDate = courseStartedDate;
  }

  id: string | undefined;
  name: string | undefined;
  courseId: string | undefined;
  groupId: string | undefined;
  direction: string | undefined;
  phonenumber: string | undefined;
  email: string | undefined;
  DNI: string | undefined;
  datebirth: string | undefined;
  parentName: string | undefined;
  parentDNI: string | undefined;
  schoolName: string | undefined;
  schoolTurn: string | undefined;
  surname: string | undefined;
  CUIT: string | undefined;
  courseStartedDate: string | undefined;
}
