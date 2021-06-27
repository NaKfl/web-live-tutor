import React, { memo } from 'react';
import { StyledModal } from './styles';
import { useTranslation } from 'react-i18next';
import { Comment, Tooltip, List, Rate, Empty } from 'antd';
import moment from 'moment';
import { DATE_TIME_FORMAT } from 'utils/constants';

const Reviews = memo(props => {
  const { t } = useTranslation();
  const { visible, onCancel, tutor, reviews, ...rest } = props;

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

  return (
    <StyledModal
      title={t('Reviews.Title')}
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
