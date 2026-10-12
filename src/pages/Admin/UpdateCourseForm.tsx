import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../store/store";
import { fetchDepartments } from "../../store/slices/departmentSlice";
import {
  fetchCourseById,
  updateCourse,
  type CourseInput,
} from "../../store/slices/courseSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const CourseEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { departments } = useSelector((state: RootState) => state.departments);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(Boolean(id));

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
      if (!id) {
        toast.error("Course ID is missing.");
        return;
      }

      try {
        const message = await dispatch(
          updateCourse({ id, data: values }),
        ).unwrap();
        toast.success(message);
        navigate("/admin/courses");
      } catch (error: any) {
        toast.error(error);
      }
    },
  });
  const { setValues } = formik;

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (!id) return;
    const getCourse = async () => {
      try {
        const course = await dispatch(fetchCourseById(id)).unwrap();
        setValues({
          code: course.code,
          name: course.name,
          departmentId: course.departmentId ?? "",
        });
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load course",
        );
      } finally {
        setLoading(false);
      }
    };

    getCourse();
  }, [dispatch, id, setValues]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">Loading course...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/admin/courses"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Courses
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">Edit Course</h1>
        <p className="mt-1 text-sm text-gray-500">Update course information.</p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Course Code */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Course Code
            </label>
            <input
              type="text"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="CS101"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.code && formik.errors.code && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.code}</p>
            )}
          </div>
          {/* Course Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter course name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Department
            </label>

            <select
              name="departmentId"
              value={formik.values.departmentId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {departments.map((department: any) => (
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
          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <Link
              to="/admin/courses"
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              {formik.isSubmitting ? "Updating..." : "Update Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEdit;
