import { useState, useEffect } from 'react';

import { isServer } from 'utils';

type TWindowSize = {
  width: number | undefined,
  height: number | undefined,
};

const useWindowSize = ():TWindowSize => {
  const [ windowSize, setWindowSize ] = useState<TWindowSize> ( ():TWindowSize => {
    if (!isServer) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    } else {
      return {
        width: undefined,
        height: undefined,
      };
    }
  });

  useEffect(() => {
    const handleResize = () => {

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

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
};

export default useWindowSize;
