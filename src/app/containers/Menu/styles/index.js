import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';

export const StyledSideBar = styled.div`
  display: flex;
  justify-content: flex-end;

  ${media.mobile`
    display: none;
  `}

  .logo-wrapper {
    margin: 20px 135px 0 0;
  }

  .open-btn {
    position: absolute;
    top: 0%;
    left: 2%;
    margin-top: 15px;
    border: none;
    box-shadow: none;
    color: black;
    font-size: x-large;
  }

  .avatar {
    position: absolute;
    margin-left: -50px;
    margin-top: 20px;
    svg {
      color: ${COLOR.CORNFLOWER};
    }
  }

  .side-nav-open {
    width: 85% !important;
  }

  .side-nav-close {
    width: 0 !important;
  }
  .side-nav {
    border-top-right-radius: 16px;
    height: 100%;
    width: 0;
    position: fixed !important;
    z-index: 5;
    top: 2.5%;
    left: 0;
    background-color: white;
    overflow-x: hidden;
    padding-top: 60px;
    transition: 0.5s;
    -webkit-box-shadow: 4px 4px 14px 0px rgba(48, 50, 50, 0.59);
    -moz-box-shadow: 4px 4px 14px 0px rgba(48, 50, 50, 0.59);
    box-shadow: 4px 4px 14px 0px rgba(48, 50, 50, 0.59);

    .logo-side-bar {
      position: absolute;
      top: 0%;
      margin-left: 10px;
    }
    .close-btn {
      position: absolute;
      top: 0;
      right: 25px;
      font-size: 36px;
      margin-left: 60px;
      border: none;
      background-color: transparent;
    }
    .close-icon {
      margin-right: -20px;
    }
    .item-link {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 16px;
      color: #818181;
      display: block;
      transition: 0.3s;
      font-weight: 500;
    }

    .menu-list {
      list-style: none;
      color: rgb(125, 125, 125);

      .menu-item {
        border-bottom: 1px solid rgb(212, 212, 212);
        padding: 10px;
        transition: 0.4s;
        &:last-child {
          border: none;
        }

        .menu-item-icon {
          float: right;
          margin: 10px 10px 0 0;
          font-size: larger;
          color: rgb(151, 151, 151);
          transition: 0.4s;
        }

        .menu-open {
          display: block;
        }

        .menu-close {
          display: none;
        }
      }

      .item-list {
        font-size: 16px;
        list-style: none;
        padding-left: 0px;
      }

      Button {
        border: none;
        box-shadow: none !important;
        color: rgb(206, 0, 111);
        font-weight: 700;
        font-size: 16px;
      }

      .item-active {
        .item-link {
          color: rgb(206, 0, 111) !important;
        }
      }
    }
  }
`;

export const StyledMenuBar = styled.div`
  .menu-list {
    list-style: none;
    display: inline-flex;
    margin-top: 0;
    margin-bottom: 0;

    > li {
      width: 190px;
      border: none;
      text-align: center;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      ${media.tablet`
          &:hover {
             .ant-btn{
               COLOR:${COLOR.CORNFLOWER};
               font-weight: 800;
                &:before {
                  display:inline-block;
                  position: absolute;
                  opacity:1;
                  border-radius: 1.5px;
                  left: 0;
                  top: 57px;
                  width: 100%;
                  height: 3px;
                  content: '';
                  background-COLOR: ${COLOR.CORNFLOWER};
                }
             }
          }
        `}

      Button {
        border: none;
        color: rgb(125, 125, 125);
        font-size: 16px;
        background: rgb(255, 255, 255);
        box-shadow: none;
        padding: 0;
        height: 100%;
        transition: none;

        &:after {
          content: none;
        }

        @media (min-width: 700px) {
          &:hover {
            .menu-title {
              &:before {
              }
            }
          }
        }

        &:focus {
          &:before {
            content: none;
          }
        }
      }

      .btn-active {
        color: rgb(206, 0, 111);
        font-weight: 800;
        &:before {
          display: inline-block;
          position: absolute;
          opacity: 1;
          border-radius: 1.5px;
          left: 0;
          top: 57px;
          width: 100%;
          height: 3px;
          content: '';
          background-color: ${COLOR.CORNFLOWER};
        }
      }
    }
  }
`;
