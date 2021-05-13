import { memo } from 'react';
import { LayoutListTutor, WrapTutor } from './styles';
import { TutorCard } from './TutorCard';
import { checkIsFavorite } from 'utils/common';
import useHooks from './hooks';

export const ListTutor = memo(({ listTutor, onClickHeart, listFavorite }) => {
  const { handlers } = useHooks();
  const { handleCallTutor, redirectToDetailTutor } = handlers;
  return (
    <LayoutListTutor>
      {listTutor.length > 0 &&
        listTutor.map((e, i) => (
          <WrapTutor key={i}>
            <TutorCard
              {...e}
              onClickHeart={onClickHeart}
              isFavorite={checkIsFavorite(listFavorite, e?.userId)}
              handleCallTutor={handleCallTutor}
              redirectToDetailTutor={redirectToDetailTutor}
            />
          </WrapTutor>
        ))}
    </LayoutListTutor>
  );
});
export default ListTutor;
