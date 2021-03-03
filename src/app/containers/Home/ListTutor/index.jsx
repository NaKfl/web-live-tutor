import { memo } from 'react';
import { LayoutListTutor } from './styles';
import { TutorCard } from './TutorCard';
import { Col } from 'antd';
import { checkIsFavorite } from 'utils/common';
import useHooks from './hooks';

export const ListTutor = memo(({ listTutor, onClickHeart, listFavorite }) => {
  const { handlers } = useHooks();
  const { showInfoTutor } = handlers;
  return (
    <LayoutListTutor gutter={[32, 24]}>
      {listTutor.length > 0 &&
        listTutor.map((e, i) => (
          <Col span={8} key={i}>
            <TutorCard
              {...e}
              onClickHeart={onClickHeart}
              isFavorite={checkIsFavorite(listFavorite, e?.userId)}
              showInfoTutor={showInfoTutor}
            />
          </Col>
        ))}
    </LayoutListTutor>
  );
});
export default ListTutor;
