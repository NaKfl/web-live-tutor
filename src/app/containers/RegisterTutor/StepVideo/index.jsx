import { Content } from './styles';
import { VideoUpload } from './VideoUpload';

export const StepVideo = ({ selectVideo }) => {
  return (
    <>
      <Content>
        <h2>Introduce yourself</h2>
        <p>
          Let students know what they can expect from a lesson with you by
          recording a video highlighting your teaching style, expertise and
          personality. Students can be nervous to speak with a foreigner, so it
          really helps to have a friendly video that introduces yourself and
          invites students to call you.
        </p>
        <span>A few helpful tips:</span>
        <ol>
          <li>Find a clean and quiet space</li>
          <li>Smile and look at the camera</li>
          <li>Dress smart</li>
          <li>Speak for 1-3 minutes</li>
          <li>Brand yourself and have fun!</li>
        </ol>
        <VideoUpload selectVideo={selectVideo} />
      </Content>
    </>
  );
};

export default StepVideo;
