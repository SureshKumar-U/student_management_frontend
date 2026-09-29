import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type ISignUp, Roles } from "../Types";
import { toast } from "react-toastify";
import { SignUpApi } from "../services/UserService";



const SignUpPage = () => {

  const [auth, setAuth] = useState<ISignUp>({ name: "", email: "", password: "", role: Roles.Student })
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()

  const validateHandler = (): boolean => {
    if (!auth.name.trim()) {
      setError("Name is required")
      toast.error("Name is required")

      return true
    }

    if (!auth.email.trim()) {
      setError("Email is required")
      toast.error("Email is required")

      return true
    }
    if (!auth.password.trim()) {
      setError("Password is required")
      toast.error("Password is required")

      return true
    }
    if (!auth.role.trim()) {
      setError("Role is required")
      toast.error("Role is required")
      return true
    }
    return false
  }

  const clickHandler = async (): Promise<void> => {
    const isError: boolean = validateHandler()
    if (isError) {
      return
    }
    try {
      const resposne = await SignUpApi(auth)
      toast.success(resposne.message);
      navigate('/')


    }
    catch (err: any) {
      toast.error(err.message)
    }




  }




  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">

        <div className="min-w-100 rounded-md border border-gray-200 bg-white px-6 py-5 shadow-lg">

          <div>
            {/* Title */}
            <div
              id="title"
              className="text-center text-xl font-bold text-gray-800"
            >
              Create your account
            </div>

            {/* Name */}
            <div className="mt-5">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Name
              </div>

              <input
                type="email"
                className="w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter Name"
                onChange={(e) => setAuth({ ...auth, name: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="mt-5">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Email Address
              </div>

              <input
                type="email"
                className="w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter Email"
                onChange={(e) => setAuth({ ...auth, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="mt-4">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Password
              </div>

              <input
                type="password"
                className="w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter Password"
                onChange={(e) => setAuth({ ...auth, password: e.target.value })}

              />
            </div>

            {/* Admin */}
            <div className="mt-4">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Role
              </div>

              <select
                className="w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setAuth({ ...auth, role: e.target.value as Roles })}
                value={auth.role}>
                <option value={Roles.Admin}>Admin</option>
                <option value={Roles.Student}>Student</option>
                <option value={Roles.Teacher}>Teacher</option>
              </select>

            </div>

            {/* Button */}
            <div className="mt-5">
              <button className="w-full cursor-pointer rounded-md bg-blue-900 px-4 py-2 font-medium text-white transition hover:bg-blue-800 active:scale-[0.99]"
                onClick={clickHandler}>
                Submit
              </button>
            </div>
          </div>
          <div className="text-center mt-2">Already have an account? <Link className="text-blue-900" to="/">Sign In</Link></div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

