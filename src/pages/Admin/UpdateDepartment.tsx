import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/store";
import {
  fetchDepartmentById,
  updateDepartment,
} from "../../store/slices/departmentSlice";

interface DepartmentInput {
  name: string;
  code: string;
}

const EditDepartmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<DepartmentInput>({
    name: "",
    code: "",
  });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const getDepartment = async () => {
      try {
        const res: any = await dispatch(fetchDepartmentById(id)).unwrap();
        setFormData({
          name: res.name,
          code: res.code,
        });
      } catch (error) {
        toast.error("Failed to load department");
      } finally {
        setLoading(false);
      }
    };
    getDepartment();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      toast.error("Department ID is missing");
      return;
    }
    try {
      const res = await dispatch(
        updateDepartment({ id, data: formData }),
      ).unwrap();

      toast.success(res || "Department updated successfully");
      navigate("/admin/departments");
    } catch (error) {
      toast.error("Failed to update department");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl py-10 text-center">
        <p className="text-gray-500">Loading department...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/admin/departments"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Departments
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Edit Department
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update department information.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Department Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Department Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              placeholder="Enter department name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Code */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Code
            </label>

            <input
              type="text"
              value={formData.code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  code: e.target.value,
                })
              }
              placeholder="Enter Code"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <Link
              to="/admin/departments"
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              Update Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartmentForm;
