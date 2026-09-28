import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Students", path: "/admin/students" },
    { name: "Departments", path: "/admin/departments" },
    { name: "Courses", path: "/admin/courses" },
    { name: "Users", path: "/admin/users" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">

        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-700">
          <h1 className="text-lg font-bold">
            Student Management
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
           className="w-full px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-red-600 hover:text-white transition">
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">

        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-gray-800">
            Admin Panel
          </h2>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              A
            </div>

            <span className="text-sm font-medium text-gray-700">
              Admin
            </span>
          </div>
        </header>

        {/* Page */}
        <div className="p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default AdminLayout;