import { ReactElement } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { useAuthentication } from "src/context/AuthenticationContext";

interface Props {
  // Now with function components, it's better to use ReactElement, equivalent more or less to JSX.Element
  // https://stackoverflow.com/a/58123882/11380987
  children?: ReactElement;
  redirectTo?: string;
}

export default function ProtectedRoute({ children, redirectTo = "/" }: Props) {
  const { user, isReady } = useAuthentication();
  const location = useLocation();
  const outletContext = useOutletContext();

  if (!isReady) {
    return null;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children ?? <Outlet context={outletContext} />;
}
