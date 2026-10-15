import { Link, useNavigate } from "react-router-dom";
import { type ISignUp, Roles } from "../../Types";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../utils/hooks/useAuth";
import { USER_VALIDATION_MESSAGES, USER_VALIDATION_LIMITS } from "../../constants/userConstants";

const SignUpPage = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth();
  const formik = useFormik<ISignUp>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: Roles.Student,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required(USER_VALIDATION_MESSAGES.NAME_REQUIRED)
        .min(USER_VALIDATION_LIMITS.NAME_MIN, USER_VALIDATION_MESSAGES.NAME_MIN_LENGTH)
        .max(USER_VALIDATION_LIMITS.NAME_MAX, USER_VALIDATION_MESSAGES.NAME_MAX_LENGTH),

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
      role: Yup.mixed<Roles>()
        .required(USER_VALIDATION_MESSAGES.ROLE_REQUIRED),
    }),
    onSubmit: async (values) => {
      try {
        const response = await signUp(values.name, values.email, values.password, values.role);
        if (response.status === "failed") {
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        navigate('/')
      } catch (error:any) {
        toast.error(error)
      }
    },
  });

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="min-w-100 rounded-md border border-gray-200 bg-white px-6 py-5 shadow-lg">
          <form onSubmit={formik.handleSubmit}>
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
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter Name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="mt-5">
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

            {/* Password */}
            <div className="mt-4">
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

            {/* Admin */}
            <div className="mt-4">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Role
              </div>

              <select
                name="role"
                className="w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}>
                <option value={Roles.Admin}>Admin</option>
                <option value={Roles.Student}>Student</option>
                <option value={Roles.Teacher}>Teacher</option>
              </select>
              {formik.touched.role && formik.errors.role && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.role}</p>
              )}

            </div>

            {/* Button */}
            <div className="mt-5">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full cursor-pointer rounded-md bg-blue-900 px-4 py-2 font-medium text-white transition hover:bg-blue-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
                {formik.isSubmitting ? "Creating account..." : "Submit"}
              </button>
            </div>
          </form>
          <div className="text-center mt-2">Already have an account? <Link className="text-blue-900" to="/">Sign In</Link></div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
