import { css } from 'styled-components/macro';

// Update your breakpoints if you want
export const sizes = {
  mobile: 480,
  tablet: 980,
  wide: 1300,
  subWide: 1142,
};

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (first, ...interpolations) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(first, ...interpolations)}
    }
  `;

  return acc;
}, {});

/* Example
const SomeDiv = styled.div`
  display: flex;
  ....
  ${media.medium`
    display: block
  `}
`;
*/
