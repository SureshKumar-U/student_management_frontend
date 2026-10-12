import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createCourse, type CourseInput } from "../../store/slices/courseSlice";
import { useAppDispatch, type RootState } from "../../store/store";
import { fetchDepartments } from "../../store/slices/departmentSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const CourseForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { departments } = useSelector((state: RootState) => state.departments);
  const formik = useFormik<CourseInput>({
    initialValues: {
      code: "",
      name: "",
      departmentId: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().trim().required("Course code is required."),
      name: Yup.string().trim().required("Course name is required."),
      departmentId: Yup.mixed<number | string>()
        .required("Department is required.")
        .test(
          "department-selected",
          "Department is required.",
          (value) => value !== "",
        ),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(createCourse(values)).unwrap();
        toast.success("Course created successfully.");
        navigate("/admin/courses");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : String(error),
        );
      }
    },
  });

  useEffect(() => {
    if (!departments.length) {
      dispatch(fetchDepartments());
    }
  }, [departments.length, dispatch]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          to="/admin/courses"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Courses
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Add Course</h1>
        <p className="mt-1 text-sm text-gray-500">Create a new course.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Code
            </label>
            <input
              type="text"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="CS101"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.code && formik.errors.code && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.code}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter course name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              name="departmentId"
              value={formik.values.departmentId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {departments.map((department:any) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            {formik.touched.departmentId && formik.errors.departmentId && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.departmentId}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Link
              to="/admin/courses"
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {formik.isSubmitting ? "Saving..." : "Save Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
