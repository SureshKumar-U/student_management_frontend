import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeletePopup from "../../components/Popup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../store/store";
import { deleteStudent, getAllStudents } from "../../store/slices/studentSlice";

const DEFAULT_PAGE_SIZE = 10;

const StudentList = () => {
  const { students } = useSelector((state: RootState) => state.students);
  const [showDelete, setShowDelete] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const auth = useSelector((state: RootState) => state.auth);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = auth?.user?.id;
    if (!userId) return;
    dispatch(getAllStudents({  pageNo, pageSize }));
  }, [auth?.user?.id, dispatch, pageNo, pageSize]);


  const handleDelete = async () => {
    try {
      const res: any = await dispatch(
        deleteStudent(selectedStudentId!),
      ).unwrap();
      toast.success(res);
      dispatch(getAllStudents({pageNo, pageSize}));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setShowDelete(false);
      setSelectedStudentId(null);
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage student information.
          </p>
        </div>
      </div>
      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <input
          type="text"
          placeholder="Search students..."
          className="w-full md:w-80 px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">ID</th>

                <th className="px-6 py-4 font-semibold">Name</th>

                <th className="px-6 py-4 font-semibold">Email</th>

                <th className="px-6 py-4 font-semibold">Department</th>

                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {!students?.length && (
                <tr>
                  <td colSpan={5} className=" text-center py-4">
                    No Students created yet
                  </td>
                </tr>
              )}
              {students?.map((student: any) => (
                <tr key={student.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-500">{student.userId}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{student.email}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {student?.department?.name || "NA"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`edit/${student.userId}`}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setShowDelete(true);
                          setSelectedStudentId(student.id);
                        }}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
              <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            Page size
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPageNo(1);
              }}
              className="rounded-md border border-gray-300 px-2 py-1"
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPageNo((currentPage) => currentPage - 1)}
              disabled={pageNo === 1}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">Page {pageNo}</span>
            <button
              type="button"
              onClick={() => setPageNo((currentPage) => currentPage + 1)}
              disabled={students.length < pageSize}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        <DeletePopup
          open={showDelete}
          title="Delete User"
          message="Are you sure you want to delete this user? This action cannot be undone."
          onClose={() => setShowDelete(false)}
          onConfirm={() => handleDelete()}
        />{" "}
      </div>
    </div>
  );
};

export default StudentList;
