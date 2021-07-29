import { useState, useEffect } from 'react';

import { isServer } from 'utils';

type TWindowSize = {
  width: number | undefined,
  height: number | undefined,
};

const useWindowSize = ():TWindowSize => {
  const [ windowSize, setWindowSize ] = useState<TWindowSize> ({
    width: !isServer ? window.innerWidth : undefined,
    height: !isServer ? window.innerHeight : undefined,
  });
  useEffect(() => {
    const handleResize = () => {

      setWindowSize(prevState => ({
        ...prevState,
        width: window.innerWidth,
        height: window.innerHeight,
      }));
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
