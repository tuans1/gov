import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  path: string;
  role: string;
}
export default function ProtectedRoute(props: Props) {
  const currentUserRole = localStorage.getItem("roles");
  if (!currentUserRole) {
    return;
  }
  if (currentUserRole === "USER" && props.role !== currentUserRole) {
    return <Navigate to="/danh-sach-file" replace />;
  }
  if (currentUserRole === "ADMIN" && props.role !== currentUserRole) {
    return <Navigate to="/" replace />;
  }
  if (currentUserRole === "CHECKER" && props.role !== currentUserRole) {
    return <Navigate to="/checker" replace />;
  }
  return <>{props.children}</>;
}
