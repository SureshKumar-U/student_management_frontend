import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAllMyCoursesApi } from "../../services/StudentService";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  code: string;
  name: string;
  department: string;
}

const MyCourses = () => {

  const auth = useContext(AuthContext);

  const [courses,setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
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
  //     code: "CS103",
  //     name: "Web Development",
  //     department: "Computer Science",
  //   },
  // ];


  useEffect(()=>{
    getAllMyCoursesApi(auth?.user?.token!, auth?.user?.id! )
    .then(res=> 
    {
      if(res?.data?.length == 0){
        return
      }
      const courses = res?.data?.map((c:any)=>{
        console.log(c)
           const course :Course = {
            id:c.id,
            name:c.name,
            code:c.code,
            department:c.department.name
           }
         return course
      })
      setCourses(courses)

    }

    )

  },[auth])



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
        <button
          onClick={() => navigate("add-course")}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white
                     font-medium hover:bg-blue-700 transition"
        >
          + Add Course
        </button>



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