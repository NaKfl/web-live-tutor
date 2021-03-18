import { memo } from 'react';
import { StyledTutorCard, StyledHeader, StyledMain, InfoText } from './styles';
import Avatar from 'app/components/Avatar';
import Title from 'app/components/Title';
import Rate from 'app/components/Rate';
import PropTypes from 'prop-types';
import Skeleton from 'app/components/Skeleton';
import Button from 'app/components/Button';
import { PhoneOutlined, HeartOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const TutorCard = memo(props => {
  const { showInfoTutor } = props;
  const { t } = useTranslation();
  return (
    <StyledTutorCard>
      <StyledHeader>
        {!props.avatar ? (
          <Skeleton.Avatar shape="circle" size={90} active className="avatar" />
        ) : (
          <Avatar
            src={props.avatar}
            shape="circle"
            size={90}
            className="avatar"
            onClick={() => {
              showInfoTutor(props);
            }}
          />
        )}
        <div className="info">
          <Title level={4} className="mb-2">
            {props.name || (
              <Skeleton.Button
                size="small"
                active
                shape="round"
                className="w-100"
              />
            )}
          </Title>
          <Rate disabled defaultValue={5} className="rate mb-2" />
          <Button disabled size="small">
            {t('Common.certificate')}
          </Button>
        </div>
        <div className="love">
          <HeartOutlined
            style={{
              fontSize: '24px',
              color: `${props.isFavorite ? 'red' : 'black'}`,
            }}
            onClick={() => props.onClickHeart(props.userId)}
          ></HeartOutlined>
        </div>
      </StyledHeader>
      <StyledMain>
        <div className="bio">
          <InfoText className="mb-2">
            {!props.bio ? (
              <Skeleton.Button
                size="small"
                active
                shape="round"
                className="w-100"
              />
            ) : (
              props.bio
            )}
          </InfoText>
        </div>
        <div className="control-layout">
          <div className="control">
            <Button>{t('Profile.title')}</Button>
            <Button type="accent" icon={<PhoneOutlined />}>
              {t('Common.call')}
            </Button>
          </div>
        </div>
      </StyledMain>
    </StyledTutorCard>
  );
});

TutorCard.propTypes = {
  userId: PropTypes.string,
  bio: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
  specialties: PropTypes.arrayOf(PropTypes.string),
  resume: PropTypes.string,
  email: PropTypes.string,
  country: PropTypes.string,
  phone: PropTypes.string,
  isActivated: PropTypes.bool,
  video: PropTypes.string,
  name: PropTypes.string,
  rate: PropTypes.number,
  onClickHeart: PropTypes.func,
};
