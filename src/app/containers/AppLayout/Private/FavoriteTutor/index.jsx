import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      <Dropdown overlay={OverLay()} placement="bottomRight" trigger={['click']}>
        <FontAwesomeIcon
          icon={faHeartbeat}
          className="heart-btn"
          onClick={() => showFavoriteTutorList()}
        />
      </Dropdown>
    </StyledFavoriteTutor>
  );
};

export default memo(FavoriteTutor);
