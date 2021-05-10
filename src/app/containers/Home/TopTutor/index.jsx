import React, { memo } from 'react';
import { StyledTopTutor } from './styles';
import { useTranslation } from 'react-i18next';
import TopTutorItem from './TopTutorItem';

export const TopTutor = ({ data }) => {
  console.log('data', data);
  const { t } = useTranslation();
  return (
    <StyledTopTutor>
      <div className="top-header">
        <p>{t('Tutors.topTutors')}</p>
      </div>
      <div className="top-list">
        {data?.tutors?.rows?.length &&
          data.tutors.rows.map((item, index) => (
            <TopTutorItem no={index + 1} info={item} />
          ))}
      </div>
    </StyledTopTutor>
  );
};

export default memo(TopTutor);
