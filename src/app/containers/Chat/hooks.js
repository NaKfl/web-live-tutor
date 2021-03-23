import { useCallback, useState } from 'react';

const useHooks = () => {
  const [togglePopup, setTogglePopup] = useState(false);

  const handleShowHidePopup = useCallback(() => {
    setTogglePopup(prevState => !prevState);
  }, []);

  return {
    handlers: { handleShowHidePopup },
    selectors: {
      togglePopup,
    },
  };
};

export default useHooks;
