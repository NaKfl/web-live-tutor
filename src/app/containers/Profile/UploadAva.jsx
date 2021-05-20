import { useCallback, memo, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Modal, Avatar } from 'antd';
import { StyledDragImage } from './styles';
import Button from 'app/components/Button';
export const UploadAvatar = memo(
  ({ visible, handleOk, handleCancel, loading }) => {
    const [previewImage, setPreviewImage] = useState();
    const [file, setFile] = useState();
    const onDrop = useCallback(acceptedFiles => {
      if (!!acceptedFiles) {
        setFile(acceptedFiles[0]);
        setPreviewImage(pre => {
          const a = acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          );
          return a[0];
        });
      }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    useEffect(() => {
      return () => {
        setPreviewImage();
      };
    }, [visible]);

    return (
      <>
        <Modal
          title="Upload avatar"
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
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                handleOk(file);
              }}
              loading={loading}
            >
              Upload
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
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </StyledDragImage>
          )}
        </Modal>
      </>
    );
  },
);

export default UploadAvatar;
