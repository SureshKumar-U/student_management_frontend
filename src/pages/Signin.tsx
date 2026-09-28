import { Link, useNavigate } from "react-router-dom";
import { type IAuthContext, Roles, type ILogin } from "../Types";
import { useContext, useState } from "react";
import { LoginApi } from "../services/UserService";
import {  toast } from 'react-toastify';
import { AuthContext } from "../context/AuthContext";


const SigninPage = () => {

  const [auth, setAuth] = useState<ILogin>({ email: "", password: "" });
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()
  const {login}  = useContext(AuthContext)!



  const clickHandler = async () => {
    const isError: Boolean = valdidate()
    if (isError) {
      return 
    }
    try {
      const response = await LoginApi(auth)
      toast.success(response.message);
      login(response.data)
      
     if(response.data.role.toLowerCase() == Roles.Student.toLowerCase() ){
        navigate("/student/dashboard")
     }
    if(response.data.role.toLowerCase() == Roles.Teacher.toLowerCase() ){
        navigate("/teacher/dashboard")
     }
    if(response.data.role.toLowerCase() == Roles.Admin.toLowerCase() ){
        navigate("/admin/dashboard")
     }
    } catch (err: any) {
      toast.error(err.message)

    }
  }

  const valdidate = () => {

    if (auth.email == "") {
      setError("Email is Required")
      toast("Email is Required")
      return true;
    }
    if (auth.password == "") {
      setError("Password is Required")
      toast("Password is Required")
      return true
    }
    return false


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
        Login to your account
      </div>

      {/* Email */}
      <div className="mt-2">
        <div className="mb-2 text-sm font-medium text-gray-700">
          Email Address
        </div>

        <input
          type="email"
          className="w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Enter Email"
          onChange={(e) =>
            setAuth({ ...auth, email: e.target.value })
          }
        />
      </div>

      {/* Password */}
      <div className="mt-2">
        <div className="mb-2 text-sm font-medium text-gray-700">
          Password
        </div>

        <input
          type="password"
          className="w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Enter Password"
          onChange={(e) =>
            setAuth({ ...auth, password: e.target.value })
          }
        />
      </div>

      {/* Button */}
      <div className="mt-3">
        <button
          className="w-full cursor-pointer rounded-md bg-blue-900 px-4 py-2 font-medium text-white transition hover:bg-blue-800 active:scale-[0.99]"
          onClick={clickHandler}
        >
          Submit
        </button>
      </div>
    </div>

    {/* Signup */}
    <div className="mt-2 text-center">
      Don't have account yet?{" "}
      <Link className="text-blue-900" to="/signup">
        Sign Up
      </Link>
    </div>

    {/* Demo Credentials */}
    <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
      <div className="mb-1 text-center text-sm font-semibold text-gray-700">
        Demo Login Credentials
      </div>

      {/* Admin */}
      <div className="mb-1 rounded-md bg-red-50 p-1 text-xs">
        <div className="font-semibold text-red-700">Admin</div>
        <div className="text-gray-600">
          Email: arun.admin@gmail.com
        </div>
        <div className="text-gray-600">
          Password: Admin@123
        </div>
      </div>

      {/* Teacher */}
      {/* <div className="mb-2 rounded-md bg-green-50 p-1 text-xs">
        <div className="font-semibold text-green-700">Teacher</div>
        <div className="text-gray-600">
          Email: suresh.kumar@gmail.com
        </div>
        <div className="text-gray-600">
          Password: Suresh@123
        </div>
      </div> */}

      {/* Student */}
      <div className="rounded-md bg-blue-50 p-1 text-xs">
        <div className="font-semibold text-blue-700">Student</div>
        <div className="text-gray-600">
          Email: arun.kumar@gmail.com
        </div>
        <div className="text-gray-600">
          Password: Arun@123
        </div>
      </div>
    </div>

  </div>
</div>


    </>
  );
};


export default SigninPage;

