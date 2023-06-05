import "./app.css";
import "boxicons/css/boxicons.min.css";
import AppLayout from "./components/layout/AppLayout";
import Groups from "./components/groups/Groups";
import Student from "./components/students/Student";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/singIn/SingIn";
import StudentCourseDetails from "./components/students/StudentCourseDetails/StudentCourseDetails";
import GroupCourseDetails from "./components/students/GroupCourseDetails/GroupCourseDetails";
import GroupStudents from "./components/groups/groupStudents/GroupStudents";
import CourseStudents from "./components/courses/courseStudents/CourseStudents";
import { Provider } from "./context/Provider";
import PrivateRoute from "./components/routes/PrivateRoute";
import RoleBasedRoute from "./components/routes/RoleBasedRoute";
import ErrorBoudary from "./error/ErrorBoudary";
import Reports from "./components/reports/Reports";
import DailyCashflow from "./components/cashflow/dailyCashflow/DailyCashflow";
import BookletPaymentControl from "./components/cashflow/bookletPaymentControl/BookletPaymentControl";
import SignInRole from "./components/auth/singIn/SingInRole";
import LogOut from "./components/auth/logOut/LogOut";
import ChangeCourseFee from "./components/courses/changeCourseFee/ChangeCourseFee";
import ListCourses from "./components/courses/listCourse/ListCourse";

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/loginRole" element={<SignInRole />} />
          <Route path="/logOut" element={<LogOut />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route path="/students">
              <Route index element={<Student />} />
              <Route path="Id/:studentId" element={<StudentCourseDetails />} />
              <Route path="groupId/:groupId" element={<GroupCourseDetails />} />
            </Route>
            <Route path="/courses">
              <Route path="students" element={<CourseStudents />} />
              <Route path="fee" element={<ChangeCourseFee />} />
              <Route path="list" element={<ListCourses />} />
            </Route>
            <Route path="/groups">
              <Route index element={<Groups />} />
              <Route path="students" element={<GroupStudents />} />
            </Route>

            <Route path="/cashflow">
              <Route
                path="bookletPaymentControl"
                element={<BookletPaymentControl />}
              />
              <Route path="daily" element={<DailyCashflow />} />
            </Route>
            <Route
              path="/reports"
              element={
                <RoleBasedRoute role="admin">
                  <Reports />
                </RoleBasedRoute>
              }
            ></Route>
            <Route path="/error/:message" element={<ErrorBoudary />}></Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
