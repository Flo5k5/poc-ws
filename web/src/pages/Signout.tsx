import { useEffect } from "react";
import { useAuthentication } from "src/context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import PageLoader from "src/pages/PageLoader";

export default function Signout() {
  const { isReady, logOut } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady) {
      logOut?.();
      navigate("/", { replace: true });
    }
  }, [isReady]);

  return <PageLoader />;
}
