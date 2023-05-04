import IStudent from "./IStudent";

export default class Student implements IStudent {
  constructor(
    id: number = 0,
    name: string = "",
    courseId: number = 0,
    groupId: number = 0,
    direction: string = "",
    phonenumber: number = 0,
    email: string = "",
    DNI: number = 0,
    datebirth: Date = new Date(),
    parentName: string = "",
    parentDNI: number = 0,
    schoolName: string = "",
    schoolTurn: string = "",
    surname: string = "",
    CUIT: string = "",
    courseStartedDate: Date = new Date()
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

  id: number;
  name: string;
  courseId: number;
  groupId: number;
  direction: string;
  phonenumber: number;
  email: string;
  DNI: number;
  datebirth: Date;
  parentName: string;
  parentDNI: number;
  schoolName: string;
  schoolTurn: string;
  surname: string;
  CUIT: string;
  courseStartedDate: Date;
}
