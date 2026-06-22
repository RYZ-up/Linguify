import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme';
import { ScreenshotPhone } from '../components/ScreenshotPhone';

export const GameScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
      <ScreenshotPhone src="screens/game.png" />
    </AbsoluteFill>
  );
};
