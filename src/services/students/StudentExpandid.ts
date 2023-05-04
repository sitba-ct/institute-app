import Course from "../course/Course";
import ICourse from "../course/ICourse";
import Group from "../group/Group";
import IGroup from "../group/IGroup";
import IStudentExpandid from "./IStudentExpandid";

export default class StudentExpandid implements IStudentExpandid {
  constructor(
    id: number = 0,
    name: string = "",
    courseId: ICourse = new Course(),
    groupId: IGroup = new Group(),
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
    this.courseStartedDate = courseStartedDate;
  }

  id: number;
  name: string;
  courseId: ICourse;
  groupId: IGroup;
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
  courseStartedDate: Date;
}
