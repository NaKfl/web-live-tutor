import { MessageOutlined, PhoneOutlined } from '@ant-design/icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'app/components/Avatar';
import Button from 'app/components/Button';
import Rate from 'app/components/Rate';
import Skeleton from 'app/components/Skeleton';
import TextHighlight from 'app/components/TextHighlight';
import Title from 'app/components/Title';
import { useControlChatPopup } from 'app/containers/Chat/hooks';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  InfoText,
  StyledAvatar,
  StyledBadge,
  StyledHeader,
  StyledMain,
  StyledSpecialties,
  StyledTutorCard,
} from './styles';
import { selectUserInfoAuthenticate } from 'app/containers/Login/selectors';
import { useSelector } from 'react-redux';

import { ROLES } from 'utils/constants';

export const TutorCard = memo(props => {
  const user = useSelector(selectUserInfoAuthenticate);
  const { handleSetNewConversation } = useControlChatPopup();
  const { handleCallTutor, redirectToDetailTutor } = props;
  const { t } = useTranslation();
  return (
    <StyledTutorCard onClick={() => redirectToDetailTutor(props)}>
      {props.isLoading && <Skeleton active avatar paragraph={{ rows: 5 }} />}
      {!props.isLoading && (
        <>
          <StyledHeader>
            <div className="header-left">
              <StyledAvatar>
                <Avatar size={90} src={props?.avatar} />
                <StyledBadge
                  color={(props?.isOnline && 'green') || '#D9D9D9'}
                />
              </StyledAvatar>
              <div className="info">
                <Title level={4} className="info-title">
                  {props.name || (
                    <Skeleton.Button
                      size="small"
                      active
                      shape="round"
                      className="w-100"
                    />
                  )}
                </Title>
                {(props?.rating && (
                  <Rate
                    disabled
                    defaultValue={props.rating}
                    className="info-rate"
                  />
                )) || (
                  <span
                    style={{ fontStyle: 'italic', color: 'rgb(0 0 0 / 0.6)' }}
                  >
                    {t('Tutors.noFeedback')}
                  </span>
                )}
                <StyledSpecialties>
                  {props?.specialties?.[0]
                    ?.split(',')
                    ?.map((content, index) => (
                      <TextHighlight
                        content={content}
                        key={content + index}
                        color="rgba(119, 119, 119, 0.8)"
                      />
                    ))}
                </StyledSpecialties>
              </div>
            </div>
            {user?.currentRole === ROLES.STUDENT && (
              <div className="header-right">
                {props.isFavorite ? (
                  <FontAwesomeIcon
                    style={{
                      fontSize: '22px',
                      color: 'rgb(255, 98, 81)',
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      props.onClickHeart(props.userId);
                    }}
                    icon={solidHeart}
                  />
                ) : (
                  <FontAwesomeIcon
                    style={{
                      fontSize: '22px',
                      color: '#777777',
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      props.onClickHeart(props.userId);
                    }}
                    icon={regularHeart}
                  />
                )}
              </div>
            )}
          </StyledHeader>
          <StyledMain>
            <div className="bio">
              <InfoText>
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
                <Button
                  type="accent"
                  icon={<MessageOutlined />}
                  onClick={e => {
                    e.stopPropagation();
                    handleSetNewConversation(props);
                  }}
                >
                  {t('Tutors.message')}
                </Button>
                {props?.isOnline && (
                  <Button
                    type="accent"
                    icon={<PhoneOutlined />}
                    onClick={e => {
                      e.stopPropagation();
                      handleCallTutor(props.userId);
                    }}
                  >
                    {t('Tutors.call')}
                  </Button>
                )}
              </div>
            </div>
          </StyledMain>
        </>
      )}
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
