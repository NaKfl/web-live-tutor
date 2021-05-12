import { memo, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { StyledImageUpload } from './styles';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

export const ImageUpload = memo(({ loading, selectAvatar, ...rest }) => {
  const { t } = useTranslation();
  const [preview, setPrivew] = useState();
  const onDrop = useCallback(
    acceptFiles => {
      if (!!acceptFiles) {
        selectAvatar(acceptFiles[0]);
        setPrivew(() => {
          const a = acceptFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          );
          return a[0];
        });
      }
    },
    [selectAvatar],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });
  return (
    <StyledImageUpload {...getRootProps()} {...rest}>
      <input {...getInputProps()} />
      {!!preview ? (
        <Image src={preview.preview} preview={false} />
      ) : (
        <p>{t('Upload.avatar')}</p>
      )}
    </StyledImageUpload>
  );
});

export default ImageUpload;
