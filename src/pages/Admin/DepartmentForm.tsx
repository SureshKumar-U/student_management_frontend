import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateDepartmentApi } from "../../services/AdminService";
import { AuthContext } from "../../context/AuthContext";


interface formData{
  name:string;
  code:string
}
const DepartmentForm = () => {

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const [formData, setFormData] = useState<formData>({name:"",code:""});

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      formData
    });
    await CreateDepartmentApi(auth?.user?.token!,formData)

    // POST /api/departments

    navigate("/admin/departments");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <div>
        <Link
          to="/admin/departments"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Departments
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Add Department
        </h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name:e.target.value})}
              placeholder="Enter department name"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code
            </label>

            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({...formData,code:e.target.value})}
              placeholder="Enter Code"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">

            <Link
              to="/admin/departments"
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Department
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default DepartmentForm;