import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../theme';
import { ZoomCallout } from '../components/ZoomCallout';

export const AIScene: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [40, 56], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <ZoomCallout src="screens/settings.png" />
      <div
        style={{
          marginTop: 48,
          opacity: titleOpacity,
          fontFamily: 'Nunito',
          fontWeight: 900,
          fontSize: 44,
          color: colors.text,
          textAlign: 'center',
        }}
      >
        Correction intelligente <span style={{ color: colors.yellow }}>par IA</span>
      </div>
    </AbsoluteFill>
  );
};
