import { useState, useEffect } from 'react';

import { isServer } from 'utils';

type TWindowSize = {
  width: number | undefined,
  height: number | undefined,
};

function useWindowSize(): TWindowSize {
  const [ windowSize, setWindowSize ] = useState<TWindowSize> ({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {

      setWindowSize(prevState => ({
        ...prevState,
        width: window.innerWidth,
        height: window.innerHeight,
      }));
      console.log(windowSize);
    }

    if (!isServer) {
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
