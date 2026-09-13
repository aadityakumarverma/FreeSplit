import React from 'react';
import Svg, { Circle, Line, Polygon } from 'react-native-svg';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface FreeSplitLogoProps {
  size?: number;
  showGlow?: boolean;
  style?: ViewStyle;
}

export const FreeSplitLogo: React.FC<FreeSplitLogoProps> = ({
  size = 68,
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
              width: size * 1.5,
              height: size * 1.5,
              borderRadius: size * 0.75,
            },
          ]}
        />
      )}
      <Svg width={size} height={size} viewBox="0 0 48 48">
        {/* Outer circular boundary */}
        <Circle
          cx="24"
          cy="24"
          r="22"
          stroke="#00D9FF"
          strokeWidth="1.2"
          strokeOpacity="0.35"
        />

        {/* Top Node (Purple #7C3CFF) */}
        <Circle
          cx="24"
          cy="11"
          r="4.5"
          fill="#02060B"
          stroke="#7C3CFF"
          strokeWidth="1.6"
        />
        <Circle cx="24" cy="11" r="2" fill="#7C3CFF" />

        {/* Left Node (Cyan #00D9FF) */}
        <Circle
          cx="13"
          cy="27"
          r="5"
          fill="#02060B"
          stroke="#00D9FF"
          strokeWidth="1.6"
        />
        <Circle cx="13" cy="27" r="2.2" fill="#00D9FF" />

        {/* Right Node (Green #00F5A0) */}
        <Circle
          cx="35"
          cy="27"
          r="5"
          fill="#02060B"
          stroke="#00F5A0"
          strokeWidth="1.6"
        />
        <Circle cx="35" cy="27" r="2.2" fill="#00F5A0" />

        {/* Connector Lines forming the triangular network */}
        <Line
          x1="18"
          y1="27"
          x2="30"
          y2="27"
          stroke="#00D9FF"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <Line
          x1="15"
          y1="23"
          x2="22"
          y2="15"
          stroke="#7C3CFF"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <Line
          x1="33"
          y1="23"
          x2="26"
          y2="15"
          stroke="#7C3CFF"
          strokeWidth="1"
          strokeOpacity="0.5"
        />

        {/* Center Diamond & Connection Hub */}
        <Polygon
          points="24,23 27.5,27 24,31 20.5,27"
          fill="none"
          stroke="#00D9FF"
          strokeWidth="0.9"
          strokeOpacity="0.5"
        />
        <Circle cx="24" cy="27" r="1.5" fill="#00D9FF" fillOpacity="0.85" />
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
    backgroundColor: 'rgba(0, 217, 255, 0.08)',
    shadowColor: '#00D9FF',
    shadowOpacity: 0.6,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
});
