import EditIcon from 'app/components/EditIcon';
import { Row } from 'app/components/Grid';
import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';

export const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`;

export const StyledEditIcon = styled(EditIcon)`
  display: inline-table;
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: transparent;
  box-shadow: 0px 4px 16px ${COLOR.SHADOW_GRAY};
  cursor: pointer;
`;

export const StyledIconEdit = styled.div`
  display: inline-table;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const StyledAvatar = styled.div`
  display: inline-flex;
  position: relative;
  margin-right: 20px;
  border-radius: 50%;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`;

export const StyledDragImage = styled.div`
  width: 100%;
  height: 280px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  transition: 'border .24s ease-in-out';
  border: 2px dashed #eee;
  border-radius: 2px;
  color: #bdbdbd;
`;

export const StyledBasicInfo = styled(Row)`
  overflow: hidden;
  padding: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 16%);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-top: solid 4px ${COLOR.CORNFLOWER};
  .group-info {
    justify-content: center;
    display: flex;
    flex-direction: column;
    h3 {
      margin-bottom: 8px;
      font-size: 24px;
    }
    span {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.54);
    }
  }
`;

export const StyledDetailInfo = styled(Row)`
  .collapse {
    width: 100%;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    border: none;
    .ant-collapse-header {
      background-color: ${COLOR.BROWN_F5};
    }
  }
  .profile-form {
    & > div {
      width: 100%;
    }
    display: flex;
    flex-direction: column;
    .ant-form-item-label {
      font-weight: 600;
      label {
        position: absolute;
        right: 15px;
        top: 5px;
      }
      label:after {
        content: none;
      }
    }

    .submit-btn {
      margin-left: auto;
    }

    .group-avatar {
      ${media.mobile`
          padding: 16px;
          justify-content: center;
      `}
    }
  }
`;
