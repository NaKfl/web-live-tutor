import { useCallback, memo, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Avatar } from 'antd';
import { StyledDragImage, StyledProfileUploadModal } from './styles';
import { notifyError } from 'utils/notify';
import Button from 'app/components/Button';
import { useTranslation } from 'react-i18next';

export const UploadAvatar = memo(
  ({ visible, handleOk, handleCancel, loading }) => {
    const { t } = useTranslation();
    const [previewImage, setPreviewImage] = useState();
    const [file, setFile] = useState();
    const onDrop = useCallback(
      acceptedFiles => {
        if (acceptedFiles.length > 0) {
          setFile(acceptedFiles[0]);
          setPreviewImage(pre => {
            const a = acceptedFiles.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              }),
            );
            return a[0];
          });
        } else {
          notifyError(t('Profile.modalUploadAvatar.errorNotify'));
        }
      },
      [t],
    );
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxSize: 5 * 1024 * 1024,
      accept: 'image/jpeg, image/png',
    });

    useEffect(() => {
      return () => {
        setPreviewImage();
      };
    }, [visible]);

    return (
      <>
        <StyledProfileUploadModal
          title={t('Profile.modalUploadAvatar.title')}
          visible={visible}
          onCancel={() => {
            setPreviewImage();
            handleCancel();
          }}
          onOk={handleOk}
          footer={[
            <Button
              key="back"
              onClick={() => {
                setPreviewImage();
                handleCancel();
              }}
            >
              {t('Profile.modalUploadAvatar.cancelBtn')}
            </Button>,
            <Button
              key="submit"
              type="accent"
              onClick={() => {
                handleOk(file);
              }}
              loading={loading}
            >
              {t('Profile.modalUploadAvatar.uploadBtn')}
            </Button>,
          ]}
        >
          {previewImage ? (
            <div className="justify-content-center d-flex">
              <Avatar
                src={previewImage.preview}
                size={280}
                shape="circle"
              ></Avatar>
            </div>
          ) : (
            <StyledDragImage {...getRootProps()}>
              <input {...getInputProps()} />
              <p>{t('Profile.modalUploadAvatar.drag')}</p>
            </StyledDragImage>
          )}
        </StyledProfileUploadModal>
      </>
    );
  },
);

export default UploadAvatar;
