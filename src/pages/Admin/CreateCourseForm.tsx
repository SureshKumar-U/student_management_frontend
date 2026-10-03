import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateCourseApi, GetAllDepartmentsApi } from "../../services/AdminService";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const CourseForm = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [departments, setDepartments] = useState<any>([])
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    departmentId: 0,
  });

  useEffect(() => {
    if(!auth) return
    GetAllDepartmentsApi(auth?.user?.token!).then(res => {
      setDepartments(res.data)
    })
  }, [auth])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:value,
    }));
  };
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const res:any = await CreateCourseApi(auth?.user?.token!,formData)
    toast(res.message)
  navigate("/admin/courses");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          to="/admin/courses"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Courses
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Add Course
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new course.
        </p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="CS101"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter course name"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments?.length &&
                departments.map((dept: any) => {
                  return (
                    <option value={dept.id}>
                      {dept.name}
                    </option>
                  )
                })}
            </select>
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
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;

