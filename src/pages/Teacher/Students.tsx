interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
}

const Students = () => {

  const students: Student[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john@gmail.com",
      course: "Programming",
    },
    {
      id: 2,
      name: "David Kumar",
      email: "david@gmail.com",
      course: "Programming",
    },
    {
      id: 3,
      name: "Alex Thomas",
      email: "alex@gmail.com",
      course: "Database Management",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Students
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Students enrolled in your courses.
        </p>

      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">

        <input
          type="text"
          placeholder="Search students..."
          className="w-full md:w-80 px-4 py-2.5 border border-gray-300
                     rounded-lg text-sm outline-none
                     focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500"
        />

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left">

            <thead className="bg-gray-50 border-b">

              <tr>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  ID
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Name
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Email
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Course
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50"
                >

                  <td className="px-6 py-4 text-gray-500">
                    ST{student.id.toString().padStart(3, "0")}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {student.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {student.email}
                  </td>

                  <td className="px-6 py-4">

                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                      {student.course}
                    </span>

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

export default Students;
