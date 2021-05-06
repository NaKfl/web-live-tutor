import { memo } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { useForFavoriteList } from 'app/containers/Home/hooks';
import saga from 'app/containers/Home/saga';
import { sliceKey } from 'app/containers/Home/slice';
import { useInjectSaga } from 'utils/reduxInjectors';
import Menu from 'app/components/Menu';
import Dropdown from 'app/components/Dropdown';
import { FavoriteChild } from './FavoriteChild';
import { useTranslation } from 'react-i18next';

export const FavoriteTutor = () => {
  useInjectSaga({ key: sliceKey, saga });
  const { handlers, selectors } = useForFavoriteList();
  const { listFavorite } = selectors;
  const { showFavoriteTutorList } = handlers;
  const { t } = useTranslation();

  const OverLay = () => {
    return (
      <Menu>
        <Menu.ItemGroup title={t('Favorite.title')}>
          {listFavorite.length > 0 ? (
            listFavorite.map((data, i) => (
              <Menu.Item key={i}>
                <FavoriteChild {...data?.secondInfo}></FavoriteChild>
              </Menu.Item>
            ))
          ) : (
            <Menu.Item>{t('Favorite.noOne')}</Menu.Item>
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
