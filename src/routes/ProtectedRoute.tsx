import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { paths } from "../constants/path";
import { Roles } from "../Types";

type Props = {
  children: React.ReactNode;
  allowedRoles?: Roles[];
};

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user?.token) return <Navigate to={paths.home} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const dashboardPath =
      user.role === Roles.Admin
        ? paths.admin.dashboard
        : user.role === Roles.Student
          ? paths.student.dashboard
          : paths.home;

    return <Navigate to={dashboardPath} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
