import React, { memo } from 'react';
import { StyledTopTutor } from './styles';
import { useTranslation } from 'react-i18next';
import TopTutorItem from './TopTutorItem';
import { Empty, Skeleton } from 'antd';

export const TopTutor = ({ data, isLoading }) => {
  const { t } = useTranslation();
  return (
    <StyledTopTutor>
      <div className="top-header">
        <p>{t('Tutors.topTutors')}</p>
      </div>
      <div className="top-list">
        {(isLoading && (
          <div style={{ padding: 20 }}>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} avatar active paragraph={{ rows: 1 }} />
            ))}
          </div>
        )) || (
          <>
            {(data?.length > 0 &&
              data.map((item, index) => (
                <TopTutorItem key={item?.id} no={index + 1} info={item} />
              ))) || (
              <Empty
                className="mt-5"
                description={<span>{t('Tutors.emptyList')}</span>}
              />
            )}
          </>
        )}
      </div>
    </StyledTopTutor>
  );
};

export default memo(TopTutor);
