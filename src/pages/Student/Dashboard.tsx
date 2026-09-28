import { useContext, useEffect, useState } from "react";
import { getStudentByIdApi } from "../../services/StudentService";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {

  const auth = useContext(AuthContext);
  const [data,setData] = useState<any>({})
  const courses = [
    {
      code: "CS101",
      name: "Programming",
    },
    {
      code: "CS102",
      name: "Database Management",
    },
    {
      code: "CS103",
      name: "Web Development",
    },
  ];


  useEffect(()=>{
    if(!auth) return
    getStudentByIdApi(auth?.user?.token!,auth?.user?.id!).
    then(res=>setData(res.data))
  },[auth])

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, John!
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your student account.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Student ID */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

          <p className="text-sm font-medium text-gray-500">
            Student ID
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {data.rollNumber!}
          </p>

        </div>

        {/* Department */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

          <p className="text-sm font-medium text-gray-500">
            Department
          </p>

          <p className="mt-2 text-xl font-bold text-gray-900">
            {data?.department?.name}
          </p>

        </div>

        {/* Courses */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

          <p className="text-sm font-medium text-gray-500">
            Enrolled Courses
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {data?.enrollments?.length}
          </p>

        </div>

      </div>

      {/* Courses */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

        <div className="px-6 py-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            My Courses
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left">

            <thead className="bg-gray-50">

              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Course Code
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Course Name
                </th>
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">
              
              {data?.enrollments?.map((course) => (
                <tr
                  key={course.code}
                  className="hover:bg-gray-50"
                >

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                      {course.code}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {course.name}
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

export default Dashboard;