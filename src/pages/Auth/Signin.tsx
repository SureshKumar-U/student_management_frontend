import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useAuth from "../../utils/hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { USER_VALIDATION_MESSAGES, USER_VALIDATION_LIMITS } from "../../constants/userConstants";

const SigninPage = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth();
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
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter Password"
              />
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

