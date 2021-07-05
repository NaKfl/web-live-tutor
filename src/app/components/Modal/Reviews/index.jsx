import React, { memo } from 'react';
import { StyledModal } from './styles';
import { useTranslation } from 'react-i18next';
import { Comment, Tooltip, List, Rate, Empty, Spin } from 'antd';
import moment from 'moment';
import { ACTION_STATUS, DATE_TIME_FORMAT } from 'utils/constants';
import useHook from './hook';

const Reviews = memo(props => {
  const { t } = useTranslation();
  const { selectors } = useHook(props);
  const { reviews, userName, selectorFeedbackSession } = selectors;
  const { visible, onCancel, ...rest } = props;

  const formattedReviews = reviews?.map(item => ({
    author: item.firstInfo?.name,
    avatar: item.firstInfo?.avatar,
    content: (
      <div>
        <Rate disabled value={item.rating} className="rate" />
        <p className="content">{item.content}</p>
      </div>
    ),
    datetime: (
      <Tooltip title={moment(item.createdAt).format(DATE_TIME_FORMAT)}>
        <span>{moment(item.createdAt).fromNow()}</span>
      </Tooltip>
    ),
  }));

  if (selectorFeedbackSession.status === ACTION_STATUS.PENDING)
    return <Spin spinning />;
  else
    return (
      <StyledModal
        title={
          userName
            ? `${t('Reviews.youReviewed')} ${userName}`
            : t('Reviews.showOthersReview')
        }
        centered
        visible={visible}
        onCancel={onCancel}
        footer={false}
        {...rest}
      >
        {(formattedReviews && formattedReviews.length > 0 && (
          <List
            itemLayout="horizontal"
            dataSource={formattedReviews}
            renderItem={item => (
              <li>
                <Comment
                  actions={false}
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            )}
          />
        )) || (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t('Tutors.noFeedback')}
          />
        )}
      </StyledModal>
    );
});

export default Reviews;
