import { MessageFilled } from '@ant-design/icons';
import Avatar from 'app/components/Avatar';
import Rate from 'app/components/Rate';
import { useControlChatPopup } from 'app/containers/Chat/hooks';
import React, { memo } from 'react';
import { useShowInfoTutor } from '../ListTutor/hooks';
import { StyledAvatar, StyledTopTutorItem } from './styles';
import goldMedal from 'assets/svg//goldMedal.svg';
import silverMedal from 'assets/svg//silverMedal.svg';
import bronzeMedal from 'assets/svg//bronzeMedal.svg';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const TopTutorItem = ({ no, info }) => {
  const { handleSetNewConversation } = useControlChatPopup();
  const { showInfoTutor } = useShowInfoTutor();
  const user = getUserFromStorage();

  return (
    <StyledTopTutorItem>
      <div
        className="info-group"
        onClick={() => {
          if (user.id !== info.userId) showInfoTutor(info);
        }}
      >
        <StyledAvatar className="partner-avatar">
          {(no === 1 && (
            <img className="medal" src={goldMedal} alt="goldMedal" />
          )) ||
            (no === 2 && (
              <img className="medal" src={silverMedal} alt="silverMedal" />
            )) ||
            (no === 3 && (
              <img className="medal" src={bronzeMedal} alt="bronzeMedal" />
            )) || <span>{no}</span>}
          <Avatar size={50} src={info?.User?.avatar} />
        </StyledAvatar>
        <div className="partner-info">
          <span className="partner-name">
            {info?.User?.name ?? 'Anonymous'}
          </span>
          <div className="last-content">
            <Rate
              disabled
              defaultValue={info?.User?.avgRating}
              className="rate"
            />
          </div>
        </div>
      </div>
      <div className="btn-group">
        {user.id !== info.userId && (
          <MessageFilled
            className="message-btn"
            onClick={() =>
              handleSetNewConversation({ userId: info.userId, ...info?.User })
            }
          />
        )}
      </div>
    </StyledTopTutorItem>
  );
};

export default memo(TopTutorItem);
