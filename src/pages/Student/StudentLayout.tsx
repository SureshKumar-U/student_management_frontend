import { useContext, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const StudentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {user, logout} = useContext(AuthContext)!

  useEffect(()=>{
    if(!user){
        navigate('/')
    }

  },[])

  const menuItems = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
    },
    {
      name: "My Profile",
      path: "/student/profile",
    },
    {
      name: "My Courses",
      path: "/student/courses",
    },
  ];



  

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">

        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-700">
          <h1 className="text-lg font-bold">
            Student Portal
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">

          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
          onClick={logout}
            className="w-full px-4 py-3 rounded-lg text-sm font-medium
                       text-slate-300 hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">

        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">

          <h2 className="text-lg font-semibold text-gray-800">
            Student Portal
          </h2>

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              J
            </div>

            <span className="text-sm font-medium text-gray-700">
              John Smith
            </span>

          </div>

        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default StudentLayout;