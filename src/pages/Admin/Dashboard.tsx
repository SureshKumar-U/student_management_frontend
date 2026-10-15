import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchAdminDashboardStats,
  fetchRecentStudents,
} from "../../store/slices/adminSlice";
import { useAppDispatch, type RootState } from "../../store/store";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.auth.user?.token);
  const {
    stats: dashboardStats,
    recentStudents,
    statsStatus,
    recentStudentsStatus,
    statsError,
    recentStudentsError,
  } = useSelector((state: RootState) => state.adminDashboard);




  useEffect(() => {
    if (!token) return;
    dispatch(fetchAdminDashboardStats());
    dispatch(fetchRecentStudents());
  }, [dispatch, token]);



  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back, Admin.</p>
      </div>
      {statsError && <p className="text-sm text-red-600">{statsError}</p>}
      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statsStatus === "loading" && (
          <p className="text-sm text-gray-500">Loading dashboard statistics...</p>
        )}
        {Object.entries(dashboardStats).map(([item, value]:any) => (
          <div
            key={item}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{item}</p>
                <p className="mt-2 text-xl font-bold text-gray-900">{value}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white">
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
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentStudentsError && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-red-600">
                    {recentStudentsError}
                  </td>
                </tr>
              )}
              {recentStudentsStatus === "loading" && (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    Loading recent students...
                  </td>
                </tr>
              )}
              {recentStudentsStatus === "succeeded" &&
                recentStudents.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      No Students created yet
                    </td>
                  </tr>
                )}
              {recentStudents?.map((student:any, index:number) => (
                <tr
                  key={`${student?.email}-${index}`}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {student?.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{student?.email}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {student?.department?.name || "N/A"}
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
