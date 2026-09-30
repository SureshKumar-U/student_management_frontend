import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteStudentById, getAllStudents } from "../../services/AdminService";
import { AuthContext } from "../../context/AuthContext";
import DeletePopup from "../../components/Popup";
import { toast } from "react-toastify";

interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
}

const StudentList = () => {

  const [students, setStudents] = useState<Student[]>([])
  const auth = useContext(AuthContext);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null)

  useEffect(() => {
    if (!auth?.user?.token) return;
    getAllStudents(auth?.user?.token!).then(res => {
      const students: Student[] = []
      res?.data?.forEach((st: any) => {
        const student: Student = {
          id: st.id,
          name: st.user.name,
          email: st.user.email,
          department: st?.department?.name,
        }
        students.push(student);

      })
      setStudents(students)
    })
  }, [auth])


  const handleDelete = async () => {
    try {
      const res = await deleteStudentById(auth?.user?.token!, selectedStudentId!);
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setShowDelete(false);
      setSelectedStudentId(null);
    }

  }
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Students
          </h1>

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
                <th className="px-6 py-4 font-semibold">
                  ID
                </th>

                <th className="px-6 py-4 font-semibold">
                  Name
                </th>

                <th className="px-6 py-4 font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 font-semibold">
                  Department
                </th>

                <th className="px-6 py-4 font-semibold">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">
              {!students?.length &&
                <tr>
                  <td colSpan={5} className=" text-center py-4">
                    No Students created yet
                  </td>
                </tr>
              }
              {students?.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 text-gray-500">
                    {student.id}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {student.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {student.email}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {student.department || "NA"}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">


                      <Link
                        to={`edit/${student.id}`}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => {
                          setShowDelete(true);
                          setSelectedStudentId(student.id)

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
        <DeletePopup
          open={showDelete}
          title="Delete User"
          message="Are you sure you want to delete this user? This action cannot be undone."
          onClose={() => setShowDelete(false)}
          onConfirm={() => handleDelete()}
        />      </div>

    </div>
  );
};

export default StudentList;