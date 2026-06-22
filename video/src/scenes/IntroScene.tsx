import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme';
import { Logo } from '../components/Logo';

export const IntroScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
      <Logo size={260} />
    </AbsoluteFill>
  );
};
