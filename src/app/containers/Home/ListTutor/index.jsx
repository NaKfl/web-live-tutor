import { memo } from 'react';
import { LayoutListTutor, WrapTutor } from './styles';
import { TutorCard } from './TutorCard';
import { checkIsFavorite } from 'utils/common';
import useHooks from './hooks';

export const ListTutor = memo(({ listTutor, onClickHeart, listFavorite }) => {
  const { handlers } = useHooks();
  const { showInfoTutor, handleCallTutor } = handlers;
  return (
    <LayoutListTutor>
      {listTutor.length > 0 &&
        listTutor.map((e, i) => (
          <WrapTutor key={i}>
            <TutorCard
              {...e}
              onClickHeart={onClickHeart}
              isFavorite={checkIsFavorite(listFavorite, e?.userId)}
              showInfoTutor={showInfoTutor}
              handleCallTutor={handleCallTutor}
            />
          </WrapTutor>
        ))}
    </LayoutListTutor>
  );
});
export default ListTutor;
