import { Content } from './styles';
import { VideoUpload } from './VideoUpload';
import { useTranslation } from 'react-i18next';
export const StepVideo = ({ selectVideo }) => {
  const { t } = useTranslation();
  return (
    <>
      <Content>
        <h2>{t('Register.Tutor.video.intro')}</h2>
        <p>{t('Register.Tutor.video.detail')}</p>
        <span>{t('Register.Tutor.video.tip.title')}</span>
        <ol>
          <li>{t('Register.Tutor.video.tip.t1')}</li>
          <li>{t('Register.Tutor.video.tip.t2')}</li>
          <li>{t('Register.Tutor.video.tip.t3')}</li>
          <li>{t('Register.Tutor.video.tip.t4')}</li>
          <li>{t('Register.Tutor.video.tip.t5')}</li>
        </ol>
        <VideoUpload selectVideo={selectVideo} />
      </Content>
    </>
  );
};

export default StepVideo;
