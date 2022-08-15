import { ReactNode, Suspense } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function Suspender({ children, fallback }: Props) {
  return (
    <Suspense fallback={fallback || <>Loading ...</>}>{children}</Suspense>
  );
}
