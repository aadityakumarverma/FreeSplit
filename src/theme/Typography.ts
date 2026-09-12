import { Platform, TextStyle } from 'react-native';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export const Typography = {
  // Font Families
  family: {
    display: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    body: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    mono: monoFont,
  },

  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 1.5,
    lineHeight: 38,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
    lineHeight: 30,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
    lineHeight: 24,
  },

  // Body
  body: {
    fontSize: 14,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 16,
  },

  // Tech / Mono Labels
  labelMono: {
    fontFamily: monoFont,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },
  captionMono: {
    fontFamily: monoFont,
    fontSize: 8,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },
  numberMono: {
    fontFamily: monoFont,
    fontSize: 22,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
  },
};
