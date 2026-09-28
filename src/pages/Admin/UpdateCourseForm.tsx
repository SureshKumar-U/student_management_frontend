

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  GetCourseByIdApi,
  GetAllDepartmentsApi,
  UpdateCourseApi,
} from "../../services/AdminService";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

interface Department {
  id: string;
  name: string;
}

interface Course {
  id: string;
  code: string;
  name: string;
  departmentId: string;
}

const CourseEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const auth = useContext(AuthContext);

  const [departments, setDepartments] = useState<Department[]>([]);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    departmentId: "",
  });

  const [loading, setLoading] = useState(true);

  // Get departments
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const res = await GetAllDepartmentsApi(auth?.user?.token!);

        setDepartments(res.data);
      } catch (error) {
        toast.error("Failed to load departments");
      }
    };

    getDepartments();
  }, [auth?.user?.token]);

  // Get course
  useEffect(() => {
    if (!id) return;

    const getCourse = async () => {
      try {
        const res = await GetCourseByIdApi(
          auth?.user?.token!,
          id
        );

        const course: Course = res.data;

        setFormData({
          code: course.code,
          name: course.name,
          departmentId: course.departmentId,
        });
      } catch (error) {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    getCourse();
  }, [id, auth?.user?.token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await UpdateCourseApi(
        auth?.user?.token!,
        id!,
        formData
      );

      toast.success(res.message);

      navigate("/admin/courses");
    } catch (error) {
      toast.error("Failed to update course");
    }
  };

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

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Edit Course
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update course information.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Course Code */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Course Code
            </label>

            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="CS101"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Course Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Course Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter course name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Department */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Department
            </label>

            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>

              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
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
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              Update Course
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CourseEdit;