import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDepartmentListApi, DeleteDepartmentApi} from "../../services/AdminService";
import { AuthContext } from "../../context/AuthContext";
import DeletePopup from "../../components/Popup"
import { toast } from "react-toastify/unstyled";

interface Department {
  id: number;
  name: string;
  students: [];
  // studentCount: number;
}

const DepartmentList = () => {

  const auth = useContext(AuthContext);
  const [showDelete, setShowDelete] = useState(false);
  const [departments, setDepartments] = useState([])
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number|null>(null)

  useEffect(() => {
    getDepartmentListApi(auth?.user?.token!)
      .then(res => setDepartments(res.data))
  }, [])

    const handleDelete = async () => {
      try {
        const res =await DeleteDepartmentApi(auth?.user?.token!, selectedDepartmentId!)
        toast.success(res.message)
  
      } catch (err: any) {
        toast.error(err?.message!)
      }
      finally{
           setShowDelete(false);
           setSelectedDepartmentId(null);
      }
  
    };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Departments
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage academic departments.
          </p>
        </div>

        <Link
          to="/admin/departments/create"
          className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          + Add Department
        </Link>

      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  ID
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Department
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Students
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {departments?.map((department: Department, index) => (
                <tr
                  key={department?.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-gray-500">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {department?.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {department?.students.length}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">

                      <Link
                        to={`/admin/departments/edit/${department?.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </Link>

                      <button 
                      onClick={()=>{
                          setShowDelete(true)
                        setSelectedDepartmentId(department?.id)}}
                      className="text-red-600 hover:text-red-800 font-medium">
                        Delete
                      </button>


                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
      <DeletePopup
        open={showDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onClose={() => setShowDelete(false)}
        onConfirm={() => handleDelete()}
      />

    </div>
  );
};

export default DepartmentList;