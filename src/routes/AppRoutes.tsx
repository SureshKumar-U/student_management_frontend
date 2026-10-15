import { Routes, Route } from "react-router-dom";
import { paths } from "../constants/path";
import SigninPage from "../pages/Auth/Signin";
import SignUpPage from "../pages/Auth/SignUp";
import AdminLayout from "../pages/Admin/AdminLayout";
import AdminDashboard from "../pages/Admin/Dashboard";
import StudentList from "../pages/Admin/StudentList";
import UpdateStudentForm from "../pages/Admin/UpdateStudentForm";
import CourseEdit from "../pages/Admin/UpdateCourseForm";
import CourseForm from "../pages/Admin/CreateCourseForm";
import DepartmentList from "../pages/Admin/DepartmentList";
import DepartmentForm from "../pages/Admin/AddDepartmentForm";
import CourseList from "../pages/Admin/CourseList";
import UserList from "../pages/Admin/UsersList";
import StudentLayout from "../pages/Student/StudentLayout";
import EditDepartmentForm from "../pages/Admin/UpdateDepartment";
import AddCourse from "../pages/Student/AddCourse";
import MyCourses from "../pages/Student/Mycourses";
import StudentDashboard from "../pages/Student/Dashboard";
import StudentProfile from "../pages/Student/Profile";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import { Roles } from "../Types";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.home} element={<SigninPage />} />
      <Route path={paths.signup} element={<SignUpPage />} />
 
      <Route
        path={paths.admin.root}
        element={
          <ProtectedRoute allowedRoles={[Roles.Admin]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path={paths.admin.dashboard} element={<AdminDashboard />} />

        <Route path={paths.admin.students} element={<StudentList />} />

        <Route path={paths.admin.studentEdit} element={<UpdateStudentForm />} />

        <Route path={paths.admin.courseEdit} element={<CourseEdit />} />
        <Route path={paths.admin.courseCreate} element={<CourseForm />} />

        <Route path={paths.admin.departments} element={<DepartmentList />} />

        <Route
          path={paths.admin.departmentCreate}
          element={<DepartmentForm />}
        />

        <Route
          path={paths.admin.departmentEdit}
          element={<EditDepartmentForm />}
        />
        <Route path={paths.admin.courses} element={<CourseList />} />

        <Route path={paths.admin.users} element={<UserList />} />
      </Route>

      <Route path={paths.student.root} element={<StudentLayout />}>
        <Route path={paths.student.dashboard} element={<StudentDashboard />} />

        <Route path={paths.student.profile} element={<StudentProfile />} />

        <Route path={paths.student.courses} element={<MyCourses />} />
        <Route path={paths.student.addCourse} element={<AddCourse />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
