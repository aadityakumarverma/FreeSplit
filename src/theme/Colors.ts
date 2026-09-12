export const Colors = {
  // Backgrounds
  bg: '#02060B',
  bgSecondary: '#050C14',
  card: '#07111C',
  cardElevated: '#0A1622',

  // Borders
  border: '#123043',
  borderSubtle: 'rgba(0, 217, 255, 0.15)',
  borderCyan: 'rgba(0, 217, 255, 0.4)',

  // Brand Accents
  cyan: '#00D9FF',
  cyanGlow: 'rgba(0, 217, 255, 0.25)',
  green: '#00F5A0',
  greenGlow: 'rgba(0, 245, 160, 0.25)',
  purple: '#7C3CFF',
  purpleGlow: 'rgba(124, 60, 255, 0.25)',
  amber: '#FFAA00',
  danger: '#FF4D6D',

  // Text
  textPrimary: '#F4F8FC',
  textSecondary: '#8A98A8',
  textMuted: '#526273',

  // Utility / standard
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Legacy mappings for backwards compatibility
  primary: '#00D9FF',
  primaryDark: '#050C14',
  secondary: '#7C3CFF',
  background: '#02060B',
  surface: '#07111C',
  text: '#F4F8FC',
  textGray: '#8A98A8',
  error: '#FF4D6D',
  success: '#00F5A0',
  warning: '#FFAA00',
} as const;

export const Gradients = {
  primary: ['#00D9FF', '#7C3CFF'] as const,
  greenCyan: ['#00F5A0', '#00D9FF'] as const,
  cardTopLine: ['transparent', 'rgba(0, 217, 255, 0.35)', 'transparent'] as const,
  buttonGlass: ['rgba(0, 217, 255, 0.15)', 'rgba(0, 217, 255, 0.05)'] as const,
};
