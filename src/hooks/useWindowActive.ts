import { useState, useEffect } from 'react';

import { isServer } from 'utils';

const hasFocus = () => !isServer && document.hasFocus();

const useWindowActive = (): boolean => {
  const [ isWindowActive, setIsWindowActive ] = useState(hasFocus);

  useEffect(() => {
    const onFocus = () => setIsWindowActive(true);
    const onBlur = () => setIsWindowActive(false);

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return isWindowActive;
};

export default useWindowActive;
