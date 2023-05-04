import ICourse from "../course/ICourse";
import IGroup from "../group/IGroup";

export default interface IStudentExpandid {
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
