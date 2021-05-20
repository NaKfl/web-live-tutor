import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from 'app/components/Button';
import { useTranslation } from 'react-i18next';
export const VideoUpload = ({ selectVideo }) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState();
  const onDrop = useCallback(
    acceptFiles => {
      if (!!acceptFiles) {
        selectVideo(acceptFiles[0]);
        const value = URL.createObjectURL(acceptFiles[0]);
        setPreview(value);
      }
    },
    [selectVideo],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'video/*',
  });
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          type="primary"
          {...getRootProps()}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '150px',
            marginBottom: '10px',
          }}
        >
          <input {...getInputProps()} />
          {t('Upload.video')}
        </Button>
        {!!preview && (
          <video width="500" height="300" controls src={preview}></video>
        )}
      </div>
    </>
  );
};

export default VideoUpload;
