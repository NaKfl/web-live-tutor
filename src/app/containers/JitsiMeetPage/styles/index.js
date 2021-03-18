import EditIcon from 'app/components/EditIcon';
import styled from 'styled-components';

export const StyledProfile = styled.div`
  display: flex;
  justify-content: center;
  .profile-form {
    max-width: 800px;
    .group-info {
      justify-content: center;
      display: flex;
      flex-direction: column;
      > h5 {
        margin: 0;
        opacity: 0.7;
        font-weight: normal;
      }
    }
  }
`;

export const StyledEditIcon = styled(EditIcon)`
  display: inline-table;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const StyledAvatar = styled.div`
  display: inline-flex;
  position: relative;
`;

export const StyledIconEdit = styled.div`
  display: inline-table;
  position: absolute;
  bottom: 0;
  right: 0;
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
