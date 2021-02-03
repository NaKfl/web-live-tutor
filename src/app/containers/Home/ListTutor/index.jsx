import { memo } from 'react';
import { LayoutListTutor } from './styles';
import { TutorCard } from './TutorCard';
import { Col } from 'antd';
import { checkIsFavorite } from 'utils/common';

export const ListTutor = memo(({ listTutor, onClickHeart, listFavorite }) => {
  return (
    <LayoutListTutor gutter={[32, 24]}>
      {listTutor.length > 0 &&
        listTutor.map((e, i) => (
          <Col span={8} key={i}>
            <TutorCard
              {...e}
              onClickHeart={onClickHeart}
              isFavorite={checkIsFavorite(listFavorite, e?.userId)}
            />
          </Col>
        ))}
    </LayoutListTutor>
  );
});
export default ListTutor;
