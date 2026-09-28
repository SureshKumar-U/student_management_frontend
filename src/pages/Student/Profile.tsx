import { useContext, useEffect, useState } from "react";
import { getStudentByIdApi,UpdateStudentApi } from "../../services/StudentService";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

interface StudentProfile {
  studentId: string;
  name: string;
  email: string;

  department: string;
}

const Profile = () => {

  const [profile, setProfile] = useState<StudentProfile>({
    studentId: "",
    name: "",
    email: "",
    department: "Computer Science",
  });
  const auth = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const [data,setData]  = useState([])

  useEffect(()=>{

    getStudentByIdApi(auth?.user?.token!, auth?.user?.id!).
    then(res=>{
      setData(res.data)
      setProfile({...profile, studentId:res.data.id,
        name:res?.data?.user?.name,
        email:res?.data?.user?.email,
        department:res?.data.department?.name
      })

    }
    
    )
  },[auth])


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };





  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

   
     try{
      const res = await UpdateStudentApi(auth?.user?.token!,profile,profile.studentId)
      toast.success(res.message)
     }
     catch(err:any){
      toast.error(err.message)
     }

    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage your profile information.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2.5 bg-blue-600 text-white text-sm
                       font-medium rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}

      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

        {/* Profile Header */}
        <div className="p-6 border-b">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
              {profile.name.charAt(0)}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {profile.name}
              </h2>

              <p className="text-sm text-gray-500">
                {profile.department}
              </p>
            </div>

          </div>

        </div>

        {/* Details */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Student ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID
              </label>

              <input
                value={profile.studentId}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border
                           border-gray-300 rounded-lg text-gray-500"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300
                           rounded-lg outline-none
                           disabled:bg-gray-100
                           focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300
                           rounded-lg outline-none
                           disabled:bg-gray-100
                           focus:ring-2 focus:ring-blue-500"
              />
            </div>


            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>

              <input
                value={profile.department}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border
                           border-gray-300 rounded-lg text-gray-500"
              />
            </div>

          </div>

          {/* Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t">

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 border border-gray-300
                           text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 text-white
                           rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>

            </div>
          )}

        </form>

      </div>

    </div>
  );
};

export default Profile;