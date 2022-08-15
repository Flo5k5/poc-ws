import { lazy } from "react";

export default function lazyPageImport(componentName: string) {
  return lazy(() => import(`src/pages/${componentName}.tsx`));
}
