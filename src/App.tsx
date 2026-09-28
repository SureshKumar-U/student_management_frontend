import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";

import StudentList from "./pages/Admin/StudentList";
import StudentForm from "./pages/Admin/StudentForm";

import DepartmentList from "./pages/Admin/DepartmentList";
import CourseList from "./pages/Admin/CourseList";
import UserList from "./pages/Admin/UsersList";
import DepartmentForm from "./pages/Admin/DepartmentForm";
import CourseForm from "./pages/Admin/CreateCourseForm";

import StudentLayout from "./pages/Student/StudentLayout";
import StudentDashboard from "./pages/Student/Dashboard";
import StudentProfile from "./pages/Student/Profile";
import MyCourses from "./pages/Student/Mycourses";


import TeacherLayout from "./pages/Teacher/TeacherLayout";
import TeacherDashboard from "./pages/Teacher/Dashboard";
import TeacherCourses from "./pages/Teacher/Mycourses";
import TeacherStudents from "./pages/Teacher/Students";
import TeacherProfile from "./pages/Teacher/Profile";
import SigninPage from "./pages/Signin";
import SignUpPage from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import CourseEdit from "./pages/Admin/UpdateCourseForm";
import EditDepartmentForm from "./pages/Admin/UpdateDepartment";


function App() {
  return (
    <BrowserRouter>
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
            path="students/create"
            element={<StudentForm />}
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
            element={<EditDepartmentForm/>}
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

        </Route>

        <Route path="/teacher" element={<TeacherLayout />}>

          <Route
            path="dashboard"
            element={<TeacherDashboard />}
          />

          <Route
            path="courses"
            element={<TeacherCourses />}
          />

          <Route
            path="students"
            element={<TeacherStudents />}
          />

          <Route
            path="profile"
            element={<TeacherProfile />}
          />

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
