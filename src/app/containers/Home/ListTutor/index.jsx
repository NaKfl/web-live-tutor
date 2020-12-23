import { memo } from 'react';
import { LayoutListTutor } from './styles';
import { TutorCard } from './TutorCard';
export const ListTutor = memo(({ listTutor }) => {
  return (
    <LayoutListTutor>
      {listTutor.length > 0 &&
        listTutor.map((e, i) => <TutorCard key={i} {...e} />)}
    </LayoutListTutor>
  );
});
export default ListTutor;
