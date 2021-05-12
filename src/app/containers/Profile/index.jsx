import React, { memo } from 'react';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import DatePicker from 'app/components/DatePicker';
import { Avatar, Collapse } from 'antd';
import { Row, Col } from 'app/components/Grid';
import useHooks from './hooks';
import saga from './saga';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import { reducer, sliceKey } from './slice';
import {
  StyledAvatar,
  StyledProfile,
  StyledEditIcon,
  StyledBasicInfo,
  StyledIconEdit,
  StyledDetailInfo,
} from './styles';
import { useTranslation } from 'react-i18next';
import UploadAvatar from './UploadAva';
const { Panel } = Collapse;

export const Profile = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { onFinish, openModal, modalControl } = handlers;
  const { info, form, loading, avatarUploadVisible, loadingUpload } = selectors;
  const { t } = useTranslation();

  return (
    <StyledProfile>
      <StyledBasicInfo>
        <Col span={9}>
          <Row justify="end">
            <StyledAvatar>
              <Avatar size={130} src={info?.avatar} />
              <StyledIconEdit onClick={openModal}>
                <StyledEditIcon />
              </StyledIconEdit>
              <UploadAvatar
                visible={avatarUploadVisible}
                loading={loadingUpload}
                {...modalControl}
              ></UploadAvatar>
            </StyledAvatar>
          </Row>
        </Col>
        <Col span={15} className="group-info">
          <h3 level={3}>{info?.name || 'Anonymous'}</h3>
          <span level={5}>{`${t('Profile.accountID')}: ${info?.id}`}</span>
        </Col>
      </StyledBasicInfo>

      <StyledDetailInfo>
        <Collapse className="collapse" defaultActiveKey={['1']}>
          <Panel
            className="align-center-panel"
            showArrow={false}
            header={t('Profile.account')}
            key="1"
          >
            <Form
              id="profile-form"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              layout="horizontal"
              className="profile-form"
              form={form}
              onFinish={onFinish}
              requiredMark={false}
              initialValues={info ?? {}}
            >
              <Form.Item
                label={t('Profile.name')}
                name="name"
                rules={[
                  {
                    required: true,
                    message: t('Profile.requiredName'),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={t('Profile.email')}
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: t('Profile.invalidEmail'),
                  },
                  {
                    required: true,
                    message: t('Profile.requiredEmail'),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label={t('Profile.phone')} name="phone">
                <Input placeholder="Phone" />
              </Form.Item>
              <Form.Item label={t('Profile.country')} name="country">
                <Input />
              </Form.Item>
              <Form.Item label={t('Profile.language')} name="language">
                <Input />
              </Form.Item>
              <Col>
                <Form.Item label={t('Profile.birthday')} name="birthday">
                  <DatePicker />
                </Form.Item>
              </Col>
            </Form>
            <Row>
              <Col span={4} offset={16}>
                <Row justify="end">
                  <Button
                    form="profile-form"
                    className="submit-btn"
                    type="accent"
                    htmlType="submit"
                    loading={loading}
                  >
                    {t('Profile.btnSave')}
                  </Button>
                </Row>
              </Col>
            </Row>
          </Panel>
          <Panel
            showArrow={false}
            header={t('Profile.settings')}
            key="2"
          ></Panel>
        </Collapse>
      </StyledDetailInfo>
    </StyledProfile>
  );
};

export default memo(Profile);
