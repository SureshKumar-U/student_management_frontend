import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useAuth from "../../utils/hooks/useAuth";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { USER_VALIDATION_MESSAGES, USER_VALIDATION_LIMITS } from "../../constants/userConstants";

const SigninPage = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const signInSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email(USER_VALIDATION_MESSAGES.EMAIL_INVALID)
      .required(USER_VALIDATION_MESSAGES.EMAIL_REQUIRED)
      .min(USER_VALIDATION_LIMITS.EMAIL_MIN, USER_VALIDATION_MESSAGES.EMAIL_MIN_LENGTH)
      .max(USER_VALIDATION_LIMITS.EMAIL_MAX, USER_VALIDATION_MESSAGES.EMAIL_MAX_LENGTH),
    password: Yup.string()
      .required(USER_VALIDATION_MESSAGES.PASSWORD_REQUIRED)
      .min(USER_VALIDATION_LIMITS.PASSWORD_MIN, USER_VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH)
      .max(USER_VALIDATION_LIMITS.PASSWORD_MAX, USER_VALIDATION_MESSAGES.PASSWORD_MAX_LENGTH),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await signIn(values.email, values.password);
        if (result.status === "failed") {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        const userType = result.userType;
        if (userType?.toLocaleLowerCase() == "student") {
          navigate("/student/dashboard");
        } if (userType?.toLowerCase() == "admin") {
          navigate("/admin/dashboard");
        }
      } catch (error:any) {
        toast.error(error)
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="min-w-100 rounded-md border border-gray-200 bg-white px-6 py-5 shadow-lg">
          <div>
            <div
              id="title"
              className="text-center text-xl font-bold text-gray-800"
            >
              Login to your account
            </div>
            <div className="mt-2">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Email Address
              </div>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter Email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>
            <div className="mt-2">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Password
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border border-gray-300 p-2 pr-10 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {showPassword ? (
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.3 4.2 9 7-.3 1.1-1.1 2.3-2.2 3.4M6.2 6.2C4 7.6 2.5 9.8 2 12c.7 2.8 4 7 10 7 1.3 0 2.5-.3 3.5-.7" />
                    </svg>
                  ) : (
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>
            <div className="mt-3">
              <button
                disabled={formik.isSubmitting}
                className="w-full cursor-pointer rounded-md bg-blue-900 px-4 py-2 font-medium text-white transition hover:bg-blue-800 active:scale-[0.99]"
                onClick={() => formik.handleSubmit()}
              >
                {formik.isSubmitting ? "Signing in..." : "Submit"}
              </button>
            </div>
          </div>
          <div className="mt-2 text-center">
            Don't have account yet?{" "}
            <Link className="text-blue-900" to="/signup">
              Sign Up
            </Link>
          </div>


        </div>
      </div>
    </>
  );
};


export default SigninPage;
