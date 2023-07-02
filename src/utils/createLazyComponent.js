import { Suspense, lazy } from "react";

export default function (path) {
  const Component = lazy(path);

  return function (props) {
    return (
      <Suspense fallback={<div>Loading ...</div>}>
        <Component {...props} />
      </Suspense>
    );
  };
}
