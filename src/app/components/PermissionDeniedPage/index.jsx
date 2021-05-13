import React from 'react';
import { Result } from 'antd';
import Button from 'app/components/Button';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function PermissionDeniedPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('Error.permissionDeniedTitle')}</title>
        <meta name="description" content="Access denied" />
      </Helmet>
      <Wrapper>
        <Result
          status="403"
          title="403"
          subTitle={t('Error.permissionDenied')}
          extra={
            <Link to="/">
              <Button className="back-btn" type="accent">
                {t('Error.backHome')}
              </Button>
            </Link>
          }
        />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  .ant-result-extra {
    display: flex;
    justify-content: center;
  }
  .ant-result-title {
    font-size: 30px;
  }
  .ant-result-subtitle {
    font-size: 16px;
  }
`;
