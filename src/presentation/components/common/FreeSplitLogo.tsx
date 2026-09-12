import React from 'react';
import Svg, { Circle, Line, Polygon } from 'react-native-svg';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface FreeSplitLogoProps {
  size?: number;
  showGlow?: boolean;
  style?: ViewStyle;
}

export const FreeSplitLogo: React.FC<FreeSplitLogoProps> = ({
  size = 48,
  showGlow = false,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {showGlow && (
        <View
          style={[
            styles.glow,
            {
              width: size * 1.6,
              height: size * 1.6,
              borderRadius: size * 0.8,
            },
          ]}
        />
      )}
      <Svg width={size} height={size} viewBox="0 0 48 48">
        {/* Outer ring */}
        <Circle
          cx="24"
          cy="24"
          r="22"
          stroke="#00D9FF"
          strokeWidth="1"
          strokeOpacity="0.3"
        />

        {/* Left node (Cyan) */}
        <Circle
          cx="14"
          cy="24"
          r="5"
          fill="#02060B"
          stroke="#00D9FF"
          strokeWidth="1.5"
        />
        <Circle cx="14" cy="24" r="2.5" fill="#00D9FF" />

        {/* Right node (Green) */}
        <Circle
          cx="34"
          cy="24"
          r="5"
          fill="#02060B"
          stroke="#00F5A0"
          strokeWidth="1.5"
        />
        <Circle cx="34" cy="24" r="2.5" fill="#00F5A0" />

        {/* Top node (Purple) */}
        <Circle
          cx="24"
          cy="10"
          r="3.5"
          fill="#02060B"
          stroke="#7C3CFF"
          strokeWidth="1.5"
        />
        <Circle cx="24" cy="10" r="1.5" fill="#7C3CFF" />

        {/* Connector lines */}
        <Line
          x1="19"
          y1="24"
          x2="29"
          y2="24"
          stroke="#00D9FF"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <Line
          x1="14"
          y1="19"
          x2="24"
          y2="13"
          stroke="#7C3CFF"
          strokeWidth="0.8"
          strokeOpacity="0.5"
        />
        <Line
          x1="34"
          y1="19"
          x2="24"
          y2="13"
          stroke="#7C3CFF"
          strokeWidth="0.8"
          strokeOpacity="0.5"
        />

        {/* Center diamond & point */}
        <Polygon
          points="24,20 28,24 24,28 20,24"
          fill="none"
          stroke="#00D9FF"
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />
        <Circle cx="24" cy="24" r="1.5" fill="#00D9FF" fillOpacity="0.7" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 217, 255, 0.12)',
    shadowColor: '#00D9FF',
    shadowOpacity: 0.8,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
});
