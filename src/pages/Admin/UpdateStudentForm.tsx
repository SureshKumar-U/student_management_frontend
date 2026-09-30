import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getDepartmentListApi } from "../../services/AdminService";
import { getStudentApi, UpdateStudentApi } from "../../services/StudentService";
import { toast } from "react-toastify";

interface IStudentFormData {
  id: string,
  name: string;
  email: string;
  phone: string;
  departmentId: number;
}

interface IDepartment {
  id: string;
  name: string;
}

const UpdateStudentForm = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<IDepartment[]>([])
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const [showDelete, setShowDelete] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null)

  const [formData, setFormData] = useState<IStudentFormData>({
    id: "",
    name: "",
    email: "",
    phone: "",
    departmentId: 0,
  });


  useEffect(() => {
    if (!auth?.user) return;
    getDepartmentListApi(auth?.user?.token!)
      .then(res => {
        console.log(res)
        if (res?.data.length == 0) return
        const _departments: IDepartment[] = res.data.map((d: any) => {
          return {
            id: d.id,
            name: d.name,
          }
        })

        setDepartments(_departments)
      })

    getStudentApi(auth?.user?.token!, id!).
      then(res => {
        if (!res.data) return;
        setFormData({
          ...formData,
          name: res.data.user.name,
          email: res.data.user.email,
          id: res.data.id,
          departmentId: res.data.departmentId

        })
      }
      ).
      catch(err => console.log(err.message))

  }, [auth])


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:  value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
    const res:any = await UpdateStudentApi(auth?.user?.token!, formData,formData.id)
    toast.success(res.message);
    navigate("/admin/students");
    }catch(err:any){
      toast.error(err.message)
    }

  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <Link
          to="/admin/students"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Students
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Edit Student
        </h1>

      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>

            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={"0"}>Select Department</option>

              {departments?.map((d: IDepartment) => {
                return (
                  <option value={d.id}>{d.name}</option>
                )
              })}
            </select>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Link
              to="/admin/students"
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Student
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default UpdateStudentForm;