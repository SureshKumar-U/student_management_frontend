import { useEffect, useState } from "react";
import { UpdateStudentApi } from "../../services/StudentService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { fetchStudentById } from "../../store/slices/studentSlice";
import { useAppDispatch } from "../../store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Student } from "../../store/slices/studentSlice";

interface StudentProfile {
  studentId: string;
  name: string;
  email: string;
  department: string;
}

const Profile = () => {
  const auth = useSelector((state: any) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const { selectedStudent: studentInfo } = useSelector(
    (state: any) => state.students,
  ) as { selectedStudent: Student | null };
  const dispatch = useAppDispatch();

  const formik = useFormik<StudentProfile>({
    initialValues: {
      studentId: "",
      name: "",
      email: "",
      department: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Full name is required."),
      email: Yup.string()
        .trim()
        .email("Enter a valid email address.")
        .required("Email is required."),
    }),
    onSubmit: async (values) => {
      try {
        const res = await UpdateStudentApi({
          payload: values,
          studentId: values.studentId,
        });
        toast.success(res.message);
        setIsEditing(false);
      } catch (err: unknown) {
        toast.error(
          err instanceof Error ? err.message : "Failed to update profile.",
        );
      }
    },
  });

  useEffect(() => {
    if (!auth.user?.id) return;
    dispatch(fetchStudentById(auth.user.id));
  }, [auth.user?.id, dispatch]);

  useEffect(() => {
    if (!studentInfo) return;
    setFormIntialValues();
  }, [studentInfo]);

  const setFormIntialValues = () => {
    formik.setValues({
      studentId: String(studentInfo?.userId),
      name: studentInfo?.name ?? "",
      email: studentInfo?.email ?? "",
      department:
        typeof studentInfo?.department === "string"
          ? studentInfo.department
          : (studentInfo?.department?.name ?? ""),
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your profile information.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2.5 bg-blue-600 text-white text-sm
                       font-medium rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>
      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Profile Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
              {studentInfo?.name?.charAt(0)}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {studentInfo?.name}
              </h2>

              <p className="text-sm text-gray-500">
                {formik.values.department}
              </p>
            </div>
          </div>
        </div>
        {/* Details */}
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID
              </label>

              <input
                value={formik.values.studentId}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border
                           border-gray-300 rounded-lg text-gray-500"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300
                           rounded-lg outline-none
                           disabled:bg-gray-100
                           focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300
                           rounded-lg outline-none
                           disabled:bg-gray-100
                           focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>

              <input
                value={formik.values.department}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border
                           border-gray-300 rounded-lg text-gray-500"
              />
            </div>
          </div>

          {/* Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setFormIntialValues();
                  setIsEditing(false);
                }}
                className="px-5 py-2.5 border border-gray-300
                           text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="px-5 py-2.5 bg-blue-600 text-white
                           rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
