import React, { memo, forwardRef, useImperativeHandle } from 'react';
import useHooks from './hooks';

export const JitsiMeet = forwardRef((props, ref) => {
  const { selectors, handlers } = useHooks(props);
  const {
    loadingComponent,
    errorComponent,
    error,
    loading,
    containerStyles,
    jitsiContainerStyles,
  } = selectors;
  const { executeEndCall, getNumberOfParticipants } = handlers;

  useImperativeHandle(ref, () => ({
    exeEndCall() {
      executeEndCall();
    },
    getNumberOfPersons() {
      return getNumberOfParticipants();
    },
  }));

  return (
    <div style={{ ...{ width: '100%', height: '100%' }, ...containerStyles }}>
      {error && (errorComponent || <p>{error}</p>)}
      {!error && loading && (loadingComponent || <p>Loading ...</p>)}
      <div
        id="jitsi-container"
        style={{
          ...{
            display: loading ? 'none' : 'block',
            width: '100%',
            height: '100%',
          },
          ...jitsiContainerStyles,
        }}
      />
    </div>
  );
});

export default memo(JitsiMeet);
