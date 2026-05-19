export const opacityFilter = (isOpaque) => (isOpaque ? 'opacity(.5)' : '');
export const makeRgbOpaque = (rgb) => (rgb ? `rgba(${rgb.substring(4, rgb.length - 1)}, 0.5)` : 'rgb(0, 0, 0, 0.5)');
export const fontStyling = (family, size, weight, lineHeight) => ({
  fontFamily: family,
  fontSize: size,
  fontWeight: weight,
  lineHeight: lineHeight,
});
