import { memo } from 'react';
import { LayoutListTutor, WrapTutor } from './styles';
import { TutorCard } from './TutorCard';
import { checkIsFavorite } from 'utils/common';
import useHooks from './hooks';
import { Empty, Row } from 'antd';
import { useTranslation } from 'react-i18next';

export const ListTutor = memo(
  ({ listTutor, onClickHeart, listFavorite, isLoading }) => {
    const { t } = useTranslation();
    const { handlers } = useHooks();
    const { handleCallTutor, redirectToDetailTutor } = handlers;
    return (
      <LayoutListTutor>
        {(isLoading &&
          [...Array(9)].map((_, index) => (
            <WrapTutor key={index}>
              <TutorCard isLoading />
            </WrapTutor>
          ))) ||
          (listTutor?.length > 0 &&
            listTutor.map((e, i) => (
              <WrapTutor key={i}>
                <TutorCard
                  {...e}
                  key={e + i}
                  onClickHeart={onClickHeart}
                  isFavorite={
                    listFavorite && checkIsFavorite(listFavorite, e?.userId)
                  }
                  handleCallTutor={handleCallTutor}
                  redirectToDetailTutor={redirectToDetailTutor}
                />
              </WrapTutor>
            ))) || (
            <Row justify="center" className="w-100 my-3">
              <Empty description={<span>{t('Tutors.emptyList')}</span>} />
            </Row>
          )}
      </LayoutListTutor>
    );
  },
);

export default ListTutor;
