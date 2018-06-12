import { css } from 'styled-components'

const sizes = {
  small_mobile: 450,
  mobile: 530,
  large_mobile: 750,
  tablet: 900,
  small: 1024,
  medium: 1280,
  large: 1366,
  large_screen: 1639,
  super: 1920,
};

const sizes_height = {
  tablet: 1000
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return accumulator;
}, {});

export const mediaExceed = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return accumulator;
}, {});

export const mediaExceedHeight = Object.keys(sizes_height).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (min-height: ${sizes_height[label]}px) and (max-width: 1024px) {
      ${css(...args)}
    }
  `
  return accumulator;
}, {});