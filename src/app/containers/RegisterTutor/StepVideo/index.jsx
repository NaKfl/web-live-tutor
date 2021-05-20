import VideoTutor from 'assets/svg/tutor-video.svg';
import Divider from 'app/components/Divider';
import Alert from 'app/components/Alert';
import { Content, Introduction } from './styles';
import { VideoUpload } from './VideoUpload';
import { useTranslation } from 'react-i18next';

export const StepVideo = ({ selectVideo }) => {
  const { t } = useTranslation();
  return (
    <>
      <Introduction>
        <img className="intro-image" src={VideoTutor} alt="intro-video" />
        <div className="intro-content">
          <h2>{t('Register.Tutor.video.intro')}</h2>
          <p>{t('Register.Tutor.video.detail')}</p>
        </div>
      </Introduction>
      <Content>
        <Divider orientation="left">{t('Register.Tutor.video.title')}</Divider>
        <Alert
          style={{ marginBottom: 30 }}
          message={
            <>
              <span>{t('Register.Tutor.video.tip.title')}</span>
              <ol style={{ marginBottom: 0, marginLeft: 20 }}>
                <li>{t('Register.Tutor.video.tip.t1')}</li>
                <li>{t('Register.Tutor.video.tip.t2')}</li>
                <li>{t('Register.Tutor.video.tip.t3')}</li>
                <li>{t('Register.Tutor.video.tip.t4')}</li>
                <li>{t('Register.Tutor.video.tip.t5')}</li>
              </ol>
            </>
          }
          type="info"
        />

        <VideoUpload selectVideo={selectVideo} />
      </Content>
    </>
  );
};

export default StepVideo;
