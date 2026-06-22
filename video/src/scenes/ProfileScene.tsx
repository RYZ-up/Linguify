import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme';
import { ScreenshotPhone } from '../components/ScreenshotPhone';

export const ProfileScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
      <ScreenshotPhone
        src="screens/profile.png"
        redact={[{ top: 30, left: 14, width: 60, height: 11 }]}
      />
    </AbsoluteFill>
  );
};
