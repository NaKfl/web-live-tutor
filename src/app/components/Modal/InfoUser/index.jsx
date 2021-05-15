import React, { memo } from 'react';
import { StyledModal } from './styles';

const TutorModal = memo(props => {
  const { visible, onCancel, tutor, ...rest } = props;

  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={[]}
      {...rest}
    ></StyledModal>
  );
});

export default TutorModal;
