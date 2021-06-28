import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { WEB_API } from 'configs';
import React, { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import LeftSideCourse from './LeftSideCourse';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import {
  StyledExploreCourse,
  StyledLayoutExplore,
  StyledRightExplore,
} from './styles';

export const ExploreCourse = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
  const { handleChangeTopic } = handlers;
  const { detailCourse, fileName } = selectors;

  const renderToolbar = Toolbar => (
    <Toolbar>
      {slots => {
        const {
          CurrentPageInput,
          Download,
          EnterFullScreen,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          ShowSearchPopover,
          Zoom,
          ZoomIn,
          ZoomOut,
        } = slots;
        return (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                <GoToPreviousPage />
              </div>
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  padding: '0px 2px',
                }}
              >
                <CurrentPageInput /> / <NumberOfPages />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <GoToNextPage />
              </div>
            </div>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <div style={{ padding: '0px 2px' }}>
                <ZoomOut />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <Zoom />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <ZoomIn />
              </div>
            </div>

            <div
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <div style={{ padding: '0px 2px' }}>
                <ShowSearchPopover />
              </div>
              <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                <EnterFullScreen />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <Download />
              </div>
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: defaultTabs => [defaultTabs[0]],
    renderToolbar,
  });
  return (
    <StyledExploreCourse>
      <StyledLayoutExplore>
        <LeftSideCourse
          detailCourse={detailCourse}
          handleChangeTopic={handleChangeTopic}
        />
        <StyledRightExplore>
          <div className="container-pdf" style={{ height: '50rem' }}>
            <div
              style={{
                height: '100%',
              }}
            >
              <Viewer
                fileUrl={`${WEB_API}/pdf/${fileName}.pdf`}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </div>
        </StyledRightExplore>
      </StyledLayoutExplore>
    </StyledExploreCourse>
  );
});

export default ExploreCourse;
