import { ReactElement, Suspense } from "react";
import PageLoader from "src/pages/PageLoader";

interface Props {
  children: ReactElement;
  fallback?: ReactElement;
}

export default function Suspender({ children, fallback }: Props) {
  return (
    <Suspense fallback={fallback || <PageLoader />}>{children}</Suspense>
  );
}
