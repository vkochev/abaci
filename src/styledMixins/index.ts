import { css, keyframes } from 'styled-components';

export const baseFlexMixin = css`
  display: flex;
  align-items: baseline;
`;
export const spaceEvenlyFlexMixin = css`
  ${baseFlexMixin}
  justify-content: space-evenly;
`;

export const spaceBetweenFlexMixin = css`
  ${baseFlexMixin}
  justify-content: space-between;
`;

export const shadow1Mixin = css`
  box-shadow: -2px -2px 6px 1px #d2d2d2, 2px -2px 6px 1px #d2d2d2;
`;

export const baseOnHoverMixin = css`
  &:hover {
    cursor: pointer;
  }
`;

export const fadeInKeyframe = keyframes`
from {
  opacity: 0;
}
`;
