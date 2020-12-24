import { memo } from 'react';
import { LayoutListTutor } from './styles';
import { TutorCard } from './TutorCard';
import { Row, Col, Divider } from 'antd';

export const ListTutor = memo(({ listTutor }) => {
  return (
    <LayoutListTutor gutter={[32, 24]}>
      {listTutor.length > 0 &&
        listTutor.map((e, i) => (
          <Col span={8}>
            <TutorCard key={i} {...e} />
          </Col>
        ))}
    </LayoutListTutor>
  );
});
export default ListTutor;
