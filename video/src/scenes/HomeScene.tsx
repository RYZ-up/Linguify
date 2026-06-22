import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme';
import { ScreenshotPhone } from '../components/ScreenshotPhone';

export const HomeScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
      <ScreenshotPhone src="screens/home.png" />
    </AbsoluteFill>
  );
};
