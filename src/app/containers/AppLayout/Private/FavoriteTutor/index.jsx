import { memo } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { useForFavortiteList } from 'app/containers/Home/hooks';
import saga from 'app/containers/Home/saga';
import { sliceKey } from 'app/containers/Home/slice';
import { useInjectSaga } from 'utils/reduxInjectors';
import Menu from 'app/components/Menu';
import Dropdown from 'app/components/Dropdown';
import { FavoriteChild } from './FavoriteChild';

export const FavoriteTutor = () => {
  useInjectSaga({ key: sliceKey, saga });
  const { handlers, selectors } = useForFavortiteList();
  const { listFavorite } = selectors;
  const { showFavoriteTutorList } = handlers;

  const OverLay = () => {
    return (
      <Menu>
        <Menu.ItemGroup title="Favorite Tutor">
          {listFavorite.length > 0 ? (
            listFavorite.map((data, i) => (
              <Menu.Item key={i}>
                <FavoriteChild {...data?.secondInfo}></FavoriteChild>
              </Menu.Item>
            ))
          ) : (
            <Menu.Item>No one</Menu.Item>
          )}
        </Menu.ItemGroup>
      </Menu>
    );
  };
  return (
    <>
      <Dropdown overlay={OverLay()} placement="bottomRight" trigger={['click']}>
        <TeamOutlined
          style={{ fontSize: '24px' }}
          onClick={() => showFavoriteTutorList()}
        />
      </Dropdown>
    </>
  );
};

export default memo(FavoriteTutor);
