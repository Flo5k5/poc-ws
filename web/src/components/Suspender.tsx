import { ReactElement, Suspense } from "react";

interface Props {
  children: ReactElement;
  fallback?: ReactElement;
}

export default function Suspender({ children, fallback }: Props) {
  return (
    <Suspense fallback={fallback || <>Loading ...</>}>{children}</Suspense>
  );
}
