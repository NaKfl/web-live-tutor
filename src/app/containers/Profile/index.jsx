import React, { memo } from 'react';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import { Avatar } from 'antd';
import { Row, Col } from 'app/components/Grid';
import useHooks from './hooks';
import saga from './saga';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import { reducer, sliceKey } from './slice';
import { StyledAvatar, StyledEditIcon, StyledProfile } from './styles';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

const { Title } = Typography;

export const Profile = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { onFinish } = handlers;
  const { info, form, loading } = selectors;
  const { t } = useTranslation();
  return (
    <StyledProfile>
      <Form
        className="profile-form"
        form={form}
        onFinish={onFinish}
        requiredMark={false}
        initialValues={info ?? {}}
        layout="vertical"
      >
        <Form.Item>
          <Row>
            <Col flex={0.1}>
              <StyledAvatar>
                <Avatar
                  size={130}
                  src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/101246073_2205512612927928_6217134185102966784_o.jpg?_nc_cat=100&ccb=2&_nc_sid=09cbfe&_nc_ohc=mkddOjsBU6wAX-UaYxD&_nc_oc=AQkhBbgwpO9fIvmBqLED98tgzrAhnurd_At_Pfhw52l8KxzucoVDmpDJYnvVRa_r_MEIKguicahL-TEI3aRgu5T2&_nc_ht=scontent.fsgn5-5.fna&oh=bc8f6b6140f6c54d340f76a25928bf4a&oe=6007CFCF"
                />
                <StyledEditIcon />
              </StyledAvatar>
            </Col>
            <Col className="group-info">
              <Title level={3}>{info?.name}</Title>
              <Title level={5}>{info?.country}</Title>
            </Col>
          </Row>
        </Form.Item>

        <Row gutter={[24, 0]}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: t('Profile.requiredName'),
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
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
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: t('Profile.requiredPhone'),
                },
              ]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Location"
              name="country"
              rules={[
                {
                  required: true,
                  message: t('Profile.requiredCountry'),
                },
              ]}
            >
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Language"
              name="country"
              rules={[
                {
                  required: true,
                  message: t('Profile.requiredCountry'),
                },
              ]}
            >
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Postal code"
              name="country"
              rules={[
                {
                  required: true,
                  message: t('Profile.requiredCountry'),
                },
              ]}
            >
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="accent" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </StyledProfile>
  );
};

export default memo(Profile);
