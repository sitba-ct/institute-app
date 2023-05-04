import axios from "axios";
import ICourse from "./ICourse";
import ICourseService from "./ICourseService";
import { injectable } from "tsyringe";

@injectable()
export class CourseService implements ICourseService {
  async getCourseList(): Promise<ICourse[]> {
    let response = await axios
      .get("/rest/v1/course?select=*")
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
  async AddCourse(
    name: string,
    startDate: Date,
    initialFee: number
  ): Promise<ICourse> {
    let response = await axios
      .post("/rest/v1/course", {
        name: name,
        startDate: startDate,
        initialFee: initialFee,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });

    return response.data[0];
  }
  async EditCourse(
    name: string,
    startDate: Date,
    initialFee: number,
    id: number
  ): Promise<ICourse> {
    var url = "/rest/v1/course?id=eq." + id;
    let response = await axios
      .patch(url, {
        name: name,
        startDate: startDate,
        initialFee: initialFee,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }
  async getCourse(courseId: number): Promise<ICourse> {
    let response = await axios
      .get("/rest/v1/course?select=*&id=eq." + courseId)
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data[0];
  }
  async addCoursePeriod(amountPay: number, courseId: number) {
    let i;
    for (i = 1; i <= 9; i++) {
      await axios
        .post("/rest/v1/coursePeriodo", {
          period: i,
          periodMonths: 1,
          amountPay: amountPay,
          courseId: courseId,
        })
        .catch((error) => {
          console.log(error.toJSON());
          throw error;
        });
    }
  }
  async editCoursePeriod(coursePeriodId: number, amountPay: number) {
    var url = "/rest/v1/coursePeriodo?id=eq." + coursePeriodId;
    await axios
      .patch(url, {
        amountPay: amountPay,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
  }
}
