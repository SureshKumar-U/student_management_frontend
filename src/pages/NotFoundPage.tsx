import { Link } from "react-router-dom";
import { paths } from "../constants/path";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-lg text-center">
        <p className="text-base font-semibold text-blue-600">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-gray-600">
          The page you are looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <Link
          to={paths.home}
          className="mt-8 inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Return to sign in
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
