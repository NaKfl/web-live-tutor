import React, { memo } from 'react';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import useHooks from './hooks';
import saga from './saga';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import { reducer, sliceKey } from './slice';
import { StyledProfile } from './styles';
import { useTranslation } from 'react-i18next';

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
        className="register-form"
        form={form}
        onFinish={onFinish}
        initialValues={info ?? {}}
      >
        <Form.Item
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

        <Form.Item
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

        <Form.Item
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

        <Form.Item
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

        <Button type="accent" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </StyledProfile>
  );
};

export default memo(Profile);
