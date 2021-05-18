import React, { memo } from 'react';
import { StyledTopTutor } from './styles';
import { useTranslation } from 'react-i18next';
import TopTutorItem from './TopTutorItem';
import { Empty } from 'antd';

export const TopTutor = ({ data }) => {
  console.log('data', data);
  const { t } = useTranslation();
  return (
    <StyledTopTutor>
      <div className="top-header">
        <p>{t('Tutors.topTutors')}</p>
      </div>
      <div className="top-list">
        {(data?.length > 0 &&
          data.map((item, index) => (
            <TopTutorItem key={item?.id} no={index + 1} info={item} />
          ))) || <Empty className="mt-5" description={false} />}
      </div>
    </StyledTopTutor>
  );
};

export default memo(TopTutor);
