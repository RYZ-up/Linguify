import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../theme';
import { ScreenshotPhone } from '../components/ScreenshotPhone';

export const SettingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
      <ScreenshotPhone src="screens/settings.png" />
      <div
        style={{
          position: 'absolute',
          top: 90,
          opacity,
          fontFamily: 'Nunito',
          fontWeight: 800,
          fontSize: 34,
          color: colors.text,
          textAlign: 'center',
        }}
      >
        5 niveaux · mode chrono · sens FR <span style={{ color: colors.yellow }}>⇄</span> EN
      </div>
    </AbsoluteFill>
  );
};
