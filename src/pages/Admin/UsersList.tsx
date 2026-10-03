import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllUsers } from "../../services/UserService";

type Role = "ADMIN" | "STUDENT";

interface User {
  id: number;
  name: string;
  role: Role;
  email: string;
  // email:string
}

const UserList = () => {


  const [users,setUsers] = useState<User[]>([])

  useEffect(()=>{
      GetAllUsers()
      .then(res=>setUsers(res.data))
  },[])



  const roleClasses: Record<Role, string> = {
    ADMIN: "bg-purple-100 text-purple-700",
    STUDENT: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Users
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage users and their roles.
          </p>
        </div>
        {/* <Link
          to="/admin/users/create"
          className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          + Add User
        </Link> */}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Username
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Role
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${roleClasses[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold 
                     
                          ? "bg-green-100 text-green-700"
                      `}
                    >
                      {user.email}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4">

                    <div className="flex gap-3">

                      <Link
                        to={`/admin/users/${user.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </Link>


                    </div>

                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;