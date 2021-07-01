import { useState, useEffect } from 'react';

const hasFocus = () => typeof document !== 'undefined' && document.hasFocus();

const useIsWindowActive = (): boolean => {
  const [ isWindowActive, setIsWindowActive ] = useState(hasFocus);

  useEffect(() => {
    setIsWindowActive(hasFocus());

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

export default useIsWindowActive;
