import { useEffect } from 'react';
import useJitsi from './useJitsi';

const useHooks = props => {
  const {
    loadingComponent,
    errorComponent,
    containerStyles,
    jitsiContainerStyles,
    onError,
    onJitsi,
    ...options
  } = props;
  const { loading, error, jitsi } = useJitsi({
    parentNode: 'jitsi-container',
    ...options,
  });

  useEffect(() => {
    if (jitsi && onJitsi) onJitsi(jitsi);
  }, [jitsi, onJitsi]);

  useEffect(() => {
    if (error && onError) onError(error);
  }, [error, onError]);

  return {
    handlers: { onError, onJitsi },
    selectors: {
      loading,
      error,
      jitsi,
      loadingComponent,
      errorComponent,
      containerStyles,
      jitsiContainerStyles,
    },
  };
};

export default useHooks;
