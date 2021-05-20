import { SmileOutlined } from '@ant-design/icons';
import Result from 'app/components/Result';
import Button from 'app/components/Button';
import { useTranslation } from 'react-i18next';
import { Row } from 'app/components/Grid';
import { useHistory } from 'react-router-dom';

const StepWaiting = ({ ...rest }) => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Result
      icon={<SmileOutlined />}
      title={
        <>
          <p style={{ marginBottom: 5 }}>{t('Register.Tutor.allSteps')}</p>
          <p>{t('Register.Tutor.waitApproval')}</p>
        </>
      }
      extra={
        <Row justify="center">
          <Button type="accent" onClick={() => history.push('/')}>
            {t('Common.backHome')}
          </Button>
        </Row>
      }
      {...rest}
    />
  );
};

export default StepWaiting;
