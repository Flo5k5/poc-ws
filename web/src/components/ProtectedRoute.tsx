import { ReactElement } from "react";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useAuthentication } from "src/context/AuthenticationContext";

interface Props {
  // Now with function components, it's better to use ReactElement, equivalent more or less to JSX.Element
  // https://stackoverflow.com/a/58123882/11380987
  children?: ReactElement;
  redirectTo?: string
}

export default function ProtectedRoute({ children, redirectTo = "/" }: Props) {
  const { username } = useAuthentication();
  const location = useLocation();

  if (!username) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children ?? <Outlet context={useOutletContext()} />;
}
