import React from "react";

export const useRunOnMount = (cb: VoidFunction) => {
  const mountRef = React.useRef(false);

  React.useLayoutEffect(() => {
    if (mountRef.current === false) {
      cb();
    }
    mountRef.current = true;

    //should only run this once after the initial paint has happen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
