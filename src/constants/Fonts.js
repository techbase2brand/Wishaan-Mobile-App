import { StyleSheet } from 'react-native';
import normalizeText from './normalizetext';
export const baseFontSize = 14;
export const baseSpacing = 4;

// Todo: will update the font sizes config on the basis of theme
export const style = StyleSheet.create({
  fontSizeExtraExtraSmall: { fontSize: 9 },
  fontSizeExtraSmall: { fontSize: 10 },
  fontSizeSmall: { fontSize: 11 },
  fontSizeSmall1x: { fontSize: 12 },
  fontSizeSmall2x: { fontSize: 13 },
  fontSizeNormal: { fontSize: 14 },
  fontSizeNormal1x: { fontSize: 15 },
  fontSizeNormal2x: { fontSize: 16 },
  fontSizeMedium: { fontSize: 17 },
  fontSizeMedium1x: { fontSize: 18 },
  fontSizeMedium2x: { fontSize: 19 },
  fontSizeLarge: { fontSize: 20 },
  fontSizeLargeX: { fontSize: 22 },
  fontSizeLargeXX: { fontSize: 24 },
  fontSizeLarge1x: { fontSize: 25 },
  fontSizeLarge2x: { fontSize: 28 },
  fontSizeLarge3x: { fontSize: 30 },
  fontSizeExtraLarge: { fontSize: 35 },
  fontWeightThin: { fontWeight: '400' },
  fontWeightThin1x: { fontWeight: '500' },
  fontWeightMedium: { fontWeight: '600' },
  fontWeightMedium1x: { fontWeight: '700' },
  fontWeightBold: { fontWeight: '800' },
  fontWeightBlack: { fontWeight: '900' },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
  },
});

export const spacings = {
  none: 0,
  xxsmall: normalizeText(baseSpacing * 0.25),
  xsmall: normalizeText(baseSpacing * 0.5),
  small: normalizeText(baseSpacing * 0.75),
  small2x: normalizeText(baseSpacing * 0.75) + 2,
  normal: normalizeText(baseSpacing),
  normalx: normalizeText(baseSpacing * 1.5),
  medium: normalizeText(baseSpacing * 1.75),
  large: normalizeText(baseSpacing * 2),
  xLarge: normalizeText(baseSpacing * 2.5),
  xxLarge: normalizeText(baseSpacing * 3),
  xxxLarge: normalizeText(baseSpacing * 3.5),
  xxxxLarge: normalizeText(baseSpacing * 4),
  Large1x: normalizeText(baseSpacing * 4.5),
  Large2x: normalizeText(baseSpacing * 5),
  ExtraLarge: normalizeText(baseSpacing * 6),
  ExtraLargex: normalizeText(baseSpacing * 7),
  ExtraLarge1x: normalizeText(baseSpacing * 7.5),
  ExtraLarge2x: normalizeText(baseSpacing * 8),
  ExtraLarge3x: normalizeText(baseSpacing * 9),
  ExtraLarge4x: normalizeText(baseSpacing * 10),
};
