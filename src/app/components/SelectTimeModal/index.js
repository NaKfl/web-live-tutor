import React, { memo } from 'react';
import { StyledModal } from './styles';
import { Row, Col, Checkbox, Typography } from 'antd';
import moment from 'moment';
// import useHooks from './hooks';
import { useTranslation } from 'react-i18next';
import useHooks from './hooks';
import Button from 'app/components/Button';
const { Title } = Typography;

const SelectTimeModal = memo(props => {
  const { t } = useTranslation();
  const { handlers, selectors } = useHooks(props);
  const { handleBookTime, onChangeCheckBox } = handlers;
  const { freeTimesTutor } = selectors;
  const { visible, onCancel, ...rest } = props;
  console.log({ freeTimesTutor });

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
        <Title level={3}>Select time</Title>
        <Checkbox.Group style={{ width: '100%' }} onChange={onChangeCheckBox}>
          <Row className="flex-column">
            {(freeTimesTutor || []).map(time => (
              <Checkbox
                value={time.id}
                key={time.id}
                checked={false}
                disabled={time.isBooked}
              >{`${time.startPeriod} - ${time.endPeriod}`}</Checkbox>
            ))}
          </Row>
        </Checkbox.Group>
        <Row className="justify-content-end mt-4">
          <Button className="me-2" key="cancel" onClick={onCancel}>
            Cancle
          </Button>
          <Button key="accept" type="accent" onClick={() => handleBookTime()}>
            Book
          </Button>
        </Row>
      </Row>
    </StyledModal>
  );
});

export default SelectTimeModal;
