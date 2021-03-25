import React, { memo } from 'react';
import useHooks from './hooks';
export const JitsiMeet = props => {
  const { selectors } = useHooks(props);
  const {
    loadingComponent,
    errorComponent,
    error,
    loading,
    containerStyles,
    jitsiContainerStyles,
  } = selectors;
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
};

export default memo(JitsiMeet);
