interface Course {
  id: number;
  code: string;
  name: string;
  department: string;
}

const MyCourses = () => {

  const courses: Course[] = [
    {
      id: 1,
      code: "CS101",
      name: "Programming",
      department: "Computer Science",
    },
    {
      id: 2,
      code: "CS102",
      name: "Database Management",
      department: "Computer Science",
    },
    {
      id: 3,
      code: "CS103",
      name: "Web Development",
      department: "Computer Science",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          My Courses
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Courses you are currently enrolled in.
        </p>
      </div>

      {/* Course count */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

        <p className="text-sm text-gray-500">
          Total Courses
        </p>

        <p className="mt-1 text-3xl font-bold text-gray-900">
          {courses.length}
        </p>

      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left">

            <thead className="bg-gray-50 border-b">

              <tr>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Code
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Course Name
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Department
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

                    <span className="px-2.5 py-1 rounded-md
                                     bg-blue-50 text-blue-700
                                     text-xs font-semibold">
                      {course.code}
                    </span>

                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {course.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {course.department}
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

export default MyCourses;