import { HeartFilled } from '@ant-design/icons';
import { Empty } from 'antd';
import Dropdown from 'app/components/Dropdown';
import Menu from 'app/components/Menu';
import { useForFavoriteList } from 'app/containers/Home/hooks';
import saga from 'app/containers/Home/saga';
import { sliceKey } from 'app/containers/Home/slice';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectSaga } from 'utils/reduxInjectors';
import { FavoriteChild } from './FavoriteChild';
import { StyledFavoriteTutor } from './styles';

export const FavoriteTutor = () => {
  useInjectSaga({ key: sliceKey, saga });
  const { selectors } = useForFavoriteList();
  const { listFavorite } = selectors;
  const { t } = useTranslation();

  const OverLay = () => {
    return (
      <Menu>
        <Menu.ItemGroup title={t('Favorite.title')}>
          {listFavorite?.length > 0 ? (
            listFavorite.map((data, i) => (
              <Menu.Item key={i}>
                <FavoriteChild {...data?.secondInfo}></FavoriteChild>
              </Menu.Item>
            ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>{t('Favorite.noOne')}</span>}
            />
          )}
        </Menu.ItemGroup>
      </Menu>
    );
  };
  return (
    <StyledFavoriteTutor>
      <Dropdown
        className="dropdown"
        overlay={OverLay()}
        placement="bottomRight"
        trigger={['click']}
      >
        <HeartFilled className="heart-btn" />
      </Dropdown>
    </StyledFavoriteTutor>
  );
};

export default memo(FavoriteTutor);
