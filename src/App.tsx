import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";

import StudentList from "./pages/Admin/StudentList";
import StudentForm from "./pages/Admin/UpdateStudentForm";

import DepartmentList from "./pages/Admin/DepartmentList";
import CourseList from "./pages/Admin/CourseList";
import UserList from "./pages/Admin/UsersList";
import DepartmentForm from "./pages/Admin/DepartmentForm";
import CourseForm from "./pages/Admin/CreateCourseForm";

import StudentLayout from "./pages/Student/StudentLayout";
import StudentDashboard from "./pages/Student/Dashboard";
import StudentProfile from "./pages/Student/Profile";
import MyCourses from "./pages/Student/Mycourses";

import SigninPage from "./pages/Signin";
import SignUpPage from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import CourseEdit from "./pages/Admin/UpdateCourseForm";
import EditDepartmentForm from "./pages/Admin/UpdateDepartment";
import AddCourse from "./pages/Student/AddCourse";
import UpdateStudentForm from "./pages/Admin/UpdateStudentForm";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/admin" element={<AdminLayout />}>

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="students"
            element={<StudentList />}
          />

          <Route
            path="students/edit/:id"
            element={<UpdateStudentForm />}
          />

          <Route
            path="/admin/courses/edit/:id"
            element={<CourseEdit />}
          />
          <Route
            path="/admin/courses/create"
            element={<CourseForm />}
          />


          <Route
            path="departments"
            element={<DepartmentList />}
          />

          <Route
            path="departments/create"
            element={<DepartmentForm />}
          />


          <Route
            path="departments/edit/:id"
            element={<EditDepartmentForm />}
          />
          <Route
            path="courses"
            element={<CourseList />}
          />
          <Route
            path="courses/create"
            element={<CourseForm />}
          />


          <Route
            path="users"
            element={<UserList />}
          />
          

        </Route>

        <Route path="/student" element={<StudentLayout />}>

          <Route
            path="dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="profile"
            element={<StudentProfile />}
          />

          <Route
            path="courses"
            element={<MyCourses />}
          />
          <Route
            path="courses/add-course"
            element={<AddCourse />}
          />

        </Route>

      </Routes>

    </>
  );
}

export default App;
