import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllCoursesApi } from "../../services/AdminService";
import { AuthContext } from "../../context/AuthContext";
import DeletePopup from "../../components/Popup";
import { DeleteCourseApi } from "../../services/AdminService";
import { toast } from "react-toastify";

interface ICourse {
  id: number;
  code: string;
  name: string;
  departmentName: string;
}

const CourseList = () => {

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCourseId,setSelectedCourseId]  = useState<number | null>(null)
  const auth = useContext(AuthContext)

  const handleDelete = async () => {
    try {
      const res =await DeleteCourseApi(auth?.user?.token!, selectedCourseId!)
      toast.success(res.message)

    } catch (err: any) {
      toast.error(err?.message!)
    }
    finally{
         setShowDelete(false);
         setSelectedCourseId(null);
    }

  };




  // const courses: Course[] = [
  //   {
  //     id: 1,
  //     code: "CS101",
  //     name: "Programming",
  //     department: "Computer Science",
  //   },
  //   {
  //     id: 2,
  //     code: "CS102",
  //     name: "Database Management",
  //     department: "Computer Science",
  //   },
  //   {
  //     id: 3,
  //     code: "MA101",
  //     name: "Mathematics",
  //     department: "Mathematics",
  //   },
  // ];

  useEffect(() => {

    GetAllCoursesApi(auth?.user?.token!).then(res => setCourses(res.data))

  }, [])

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Courses
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage courses.
          </p>
        </div>

        <Link
          to="/admin/courses/create"
          className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          + Add Course
        </Link>

      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left">

            <thead className="bg-gray-50 border-b">

              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Code
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Course
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Department
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-gray-50"
                >

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold">
                      {course.code}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {course.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {course.departmentName}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-3">

                      <Link
                        to={`/admin/courses/edit/${course.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </Link>

                      <button className="text-red-600 hover:text-red-800 font-medium"
                        onClick={() => {
                          setShowDelete(true)
                          setSelectedCourseId(course.id)
                        }}
                      >
                        Delete
                      </button>
                      <DeletePopup
                        open={showDelete}
                        title="Delete User"
                        message="Are you sure you want to delete this user? This action cannot be undone."
                        onClose={() => setShowDelete(false)}
                        onConfirm={() => handleDelete()}
                      />

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default CourseList;