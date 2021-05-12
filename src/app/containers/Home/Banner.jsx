import { Image, Carousel } from 'antd';
import ImageBanner from 'assets/banners/ekuipp.png';
import ImageBanner2 from 'assets/banners/thanh-thao-ke-toan.png';
import { memo } from 'react';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

const StyledCarousel = styled(Carousel)`
  height: 100%;
  .slick-dots.slick-dots-bottom {
    bottom: 0;
    ul {
      margin: 20px;
    }
    li {
      button {
        background-color: ${COLOR.BOULDER};
        height: 5px;
      }
    }
  }
`;

const StyledImage = styled(Image)`
  height: 400px;
  width: 1000px;
`;

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <LeftOutlined
      className={className}
      style={{
        ...style,
        display: 'block',
        fontSize: 30,
        color: `${COLOR.BOULDER}`,
        left: 0,
        width: 'unset',
        opacity: 0.8,
        paddingLeft: 15,
        zIndex: 10,
      }}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <RightOutlined
      className={className}
      style={{
        ...style,
        display: 'block',
        fontSize: 30,
        color: `${COLOR.BOULDER}`,
        right: 0,
        width: 'unset',
        opacity: 0.8,
        paddingRight: 15,
        zIndex: 10,
      }}
      onClick={onClick}
    />
  );
}

export const Banner = () => {
  return (
    <StyledCarousel
      // autoplay
      arrows
      effect="scrollx"
      easing="ease-in-out"
      nextArrow={<SampleNextArrow />}
      prevArrow={<SamplePrevArrow />}
    >
      <StyledImage
        height={400}
        src={ImageBanner}
        alt="banner"
        preview={false}
      />
      <StyledImage
        height={400}
        src={ImageBanner2}
        alt="banner"
        preview={false}
      />
    </StyledCarousel>
  );
};
export default memo(Banner);
