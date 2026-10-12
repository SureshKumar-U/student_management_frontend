export const paths = {
  home: "/",
  signup: "/signup",
  admin: {
    root: "/admin",
    dashboard: "/admin/dashboard",
    students: "/admin/students",
    studentEdit: "/admin/students/edit/:id",
    courses: "/admin/courses",
    courseCreate: "/admin/courses/create",
    courseEdit: "/admin/courses/edit/:id",
    departments: "/admin/departments",
    departmentCreate: "/admin/departments/create",
    departmentEdit: "/admin/departments/edit/:id",
    users: "/admin/users",
  },
  student: {
    root: "/student",
    dashboard: "/student/dashboard",
    profile: "/student/profile",
    courses: "/student/courses",
    addCourse: "/student/courses/add-course",
  },
} as const;
