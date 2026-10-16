import { useEffect, useState } from "react";
import { getAllMyCoursesApi } from "../../services/StudentService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../store/store";
import { fetchAllCourses } from "../../store/slices/courseSlice";
import { fetchMyCourses } from "../../store/slices/studentSlice";

interface Course {
  id: number;
  code: string;
  name: string;
  department: string;
}

const MyCourses = () => {
  const auth = useSelector((state: RootState) => state.auth);
    const {courses} = useSelector((state: RootState) => state.students);

  const navigate = useNavigate();
  const dispatch =useAppDispatch();
  console.log(courses)
  useEffect(() => {
    const userId  = auth?.user?.id;
    if(!userId) return;
    dispatch(fetchMyCourses(userId))
  }, [auth?.user?.id]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>

        <p className="mt-1 text-sm text-gray-500">
          Courses you are currently enrolled in.
        </p>
      </div>
      <button
        onClick={() => navigate("add-course")}
        className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white
                     font-medium hover:bg-blue-700 transition"
      >
        + Add Course
      </button>

      {/* Course count */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <p className="text-sm text-gray-500">Total Courses</p>

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
                <th className="px-6 py-4 font-semibold text-gray-600">Code</th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Course Name
                </th>

                <th className="px-6 py-4 font-semibold text-gray-600">
                  Department
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {courses.map((course:any) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span
                      className="px-2.5 py-1 rounded-md
                                     bg-blue-50 text-blue-700
                                     text-xs font-semibold"
                    >
                      {course?.code}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {course?.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {course?.department?.name}
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
