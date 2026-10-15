import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchAllCourses } from "../../store/slices/courseSlice";
import { useAppDispatch } from "../../store/store";
import { addCourseToStudent } from "../../store/slices/studentSlice";

const AddCourse = () => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const navigate = useNavigate();
  const { courses } = useSelector((state: any) => state.courses);
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) {
      toast.warn("Please select a course");
      return;
    }
    const payload: any = {
      courseId: selectedCourseId,
      userId: auth?.user?.id,
    };

    try {
      const res: any = await dispatch(addCourseToStudent(payload)).unwrap();
      console.log(res);
      toast.success(res.message);
      navigate("/student/courses");
    } catch (err: any) {
      toast.error(err);
    } finally {
      setSelectedCourseId("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Course</h1>

        <p className="mt-1 text-sm text-gray-500">
          Select a course to add to your courses.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Course
            </label>
            <select
              id="course"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-gray-300
                         px-4 py-2.5 text-sm
                         focus:border-blue-500 focus:ring-2
                         focus:ring-blue-200 outline-none"
            >
              <option value="">-- Select Course --</option>
              {courses?.map((course: any) => (
                <option
                  className="cursor-pointer"
                  key={course.id}
                  value={course.id}
                >
                  {course?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Selected course */}
          {selectedCourseId && (
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
              <p className="text-sm text-blue-700">Selected Course ID</p>

              <p className="mt-1 font-semibold text-blue-900">
                {selectedCourseId}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="cursor-pointer w-full rounded-lg bg-blue-600
                       px-4 py-2.5 text-white font-medium
                       hover:bg-blue-700 transition"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};


export default AddCourse;
