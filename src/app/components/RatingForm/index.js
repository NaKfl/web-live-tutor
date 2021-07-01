import { Avatar, Row, Typography, Input } from 'antd';
import Button from 'app/components/Button';
import React, { memo } from 'react';
import useHooks from './hooks';
import { StarFilled } from '@ant-design/icons';
import { StyledAvatar, StyledModal, StyledTextHighlight } from './styles';
import Rate from 'app/components/Rate';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { TextArea } = Input;

const RatingForm = memo(props => {
  const { handlers, selectors } = useHooks(props);
  const {
    handleSubmitReview,
    handleChangeContent,
    handleChangeRating,
  } = handlers;
  const { t } = useTranslation();
  const { tutorInfo } = selectors;
  console.log('tutorInfo', tutorInfo);
  const { visible, onCancel, values, ...rest } = props;
  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={false}
      {...rest}
    >
      <Row className="flex-column">
        <Row className="align-items-center">
          <StyledAvatar>
            <Avatar
              src={tutorInfo?.avatar}
              shape="circle"
              size={80}
              className="avatar"
            />
          </StyledAvatar>
          <Row className="p-2 flex-column">
            <Title className="tutor-name" level={5}>
              {`${tutorInfo?.name}`}
            </Title>
            <Row>
              <StyledTextHighlight>
                <span className="average-rating">
                  {tutorInfo?.avgRating?.toFixed(2)}
                </span>
                <StarFilled className="d-flex align-items-center" />
              </StyledTextHighlight>
              <span className="d-flex align-items-center">{`${tutorInfo?.feedbacks?.length} Reviews`}</span>
            </Row>
          </Row>
        </Row>
        <hr></hr>
        <Row className="flex-column align-items-center">
          <Title className="" level={5}>
            {`${t('Review.whatIsURating')} ${tutorInfo?.name}?`}
          </Title>
          <Rate
            style={{ fontSize: '30px' }}
            onChange={handleChangeRating}
          ></Rate>
        </Row>
        <TextArea
          placeholder={`${t('Review.contentReview')}`}
          autoSize={{ minRows: 2, maxRows: 6 }}
          style={{ marginTop: '20px' }}
          onChange={handleChangeContent}
        />
        <Row className="mt-3 justify-content-end">
          <Button className="me-2" key="cancel" onClick={onCancel}>
            Later
          </Button>
          <Button
            key="accept"
            type="accent"
            onClick={() => handleSubmitReview({ user: tutorInfo })}
          >
            Submit
          </Button>
        </Row>
      </Row>
    </StyledModal>
  );
});

export default RatingForm;
