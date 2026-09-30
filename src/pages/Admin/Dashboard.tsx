import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAdminDashboardStats, getRecentStudentsApi } from "../../services/AdminService";


interface IRecentStudent {
  email: string,
  department: string,
  name:string,
}
const Dashboard = () => {

  const auth = useContext(AuthContext);
  const [dashboardStats, setDashboardStats] = useState({});
  const [recentStudents, setRecentStudents] = useState<IRecentStudent[]>([]);

  useEffect(() => {
    if (!auth?.user?.token!) return
    getAdminDashboardStats(auth?.user?.token!).
      then(res => {
        setDashboardStats(res.data)
      })

    getRecentStudentsApi(auth?.user?.token!).then(
      (res: any) => {
  
        if (res?.data?.length > 0) {
          const students: IRecentStudent[] = res?.data?.map((st: any) => {
            return {
              department: st.department ? st.department.name : "NA" ,
              email: st.user.email,
              name:st.user.name
            }


          })
          setRecentStudents(students)
        }




      }
    )
  }, [auth])


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back, Admin.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        {Object.entries(dashboardStats)?.map(([item, val]: any) => (
          <div
            key={item}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  {item}
                </p>

                <p className="mt-2 text-xl font-bold text-gray-900">
                  {val}
                </p>
              </div>

              <div
                className={`w-12 h-12 rounded-lg  bg-blue-600 flex items-center justify-center text-white`}
              >
                {item.charAt(0)}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Recent Students */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

        <div className="px-6 py-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Students
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left">

            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-medium">
                  Name
                </th>

                <th className="px-6 py-4 font-medium">
                  Email
                </th>

                <th className="px-6 py-4 font-medium">
                  Department
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
    {!recentStudents?.length &&
                <tr>
                  <td colSpan={3} className=" text-center py-4">
                    No Students created yet
                  </td>
                </tr>}
              {recentStudents?.length > 0 && <>
                {recentStudents.map(st=>{
                  return (
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {st.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {st.email}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {st.department || "NA"}
                  </td>
                </tr>
                  )
                })}

                </>

              }





            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;