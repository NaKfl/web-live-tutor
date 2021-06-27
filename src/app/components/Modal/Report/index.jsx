import { Checkbox, Form, Input, Row, Spin } from 'antd';
import Button from 'app/components/Button';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledModal } from './styles';
import { createReport } from 'fetchers/reportFetcher';
import { notifySuccess } from 'utils/notify';

const Report = memo(props => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { visible, onCancel, tutor, ...rest } = props;
  const [previewNote, setPreviewNote] = useState('');
  const [spinning, setSpinning] = useState(false);

  const suggestions = useMemo(
    () => [
      {
        id: 'annoying',
        content: t('Report.annoying'),
      },
      {
        id: 'fake',
        content: t('Report.fake'),
      },
      {
        id: 'inappropriatePhoto',
        content: t('Report.inappropriatePhoto'),
      },
    ],
    [t],
  );

  useEffect(() => {
    const contents = previewNote.split('\n');
    const newSuggestions = suggestions
      ?.filter(item => contents.includes(item.content))
      .map(item => item.id);
    form.setFieldsValue({ suggestions: newSuggestions });
  }, [form, previewNote, suggestions]);

  const onClickCheckbox = event => {
    const id = event.target.value;
    const existedContent = suggestions.find(item => item.id === id).content;
    setPreviewNote(prev => {
      if (prev.includes(existedContent)) {
        const pos = prev.indexOf(existedContent);
        const newContent =
          prev.slice(0, pos) + prev.slice(pos + existedContent.length + 1);
        return newContent;
      } else return `${prev}${existedContent}\n`;
    });
  };

  const onTextAreaChange = event => {
    const values = event.target.value;
    setPreviewNote(values);
  };

  const handleCloseModal = () => {
    onCancel();
    form.setFields([]);
    setPreviewNote('');
  };

  const createReportAPI = async () => {
    const tutorId = tutor?.User?.id;
    setSpinning(true);
    const response = await createReport({
      tutorId,
      content: previewNote,
    });
    if (response?.data) {
      notifySuccess(t('Common.notifySuccess'));
      handleCloseModal();
    }
    setSpinning(false);
  };

  return (
    <StyledModal
      title={`${t('Report.title')} ${tutor?.User?.name ?? ''}`}
      centered
      visible={visible}
      onCancel={handleCloseModal}
      footer={[
        <Button onClick={handleCloseModal}>{t('Report.cancel')}</Button>,
        <Button onClick={createReportAPI} type="accent" disabled={!previewNote}>
          {t('Report.submit')}
        </Button>,
      ]}
      {...rest}
    >
      <Spin spinning={spinning} tip={t('Report.sending')}>
        <Form form={form}>
          <Form.Item name="suggestions">
            <Checkbox.Group>
              {suggestions.map(item => (
                <Row key={item.id}>
                  <Checkbox onClick={onClickCheckbox} value={item.id}>
                    {item.content}
                  </Checkbox>
                </Row>
              ))}
            </Checkbox.Group>
          </Form.Item>
          <Input.TextArea
            value={previewNote}
            rows={4}
            onChange={onTextAreaChange}
          />
        </Form>
      </Spin>
    </StyledModal>
  );
});

export default Report;
