import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../theme';
import { Logo } from '../components/Logo';
import { TypewriterText } from '../components/TypewriterText';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
      <Logo size={120} appear={false} />
      <div
        style={{
          marginTop: 24,
          fontFamily: 'Nunito',
          fontWeight: 900,
          fontSize: 96,
          color: colors.text,
          opacity: titleOpacity,
        }}
      >
        Lingu<span style={{ color: colors.yellow }}>ify</span>
      </div>
      <TypewriterText
        text="Apprends le français et l'anglais en t'amusant"
        startFrame={20}
        style={{
          marginTop: 18,
          fontFamily: 'Nunito',
          fontWeight: 600,
          fontSize: 38,
          color: colors.muted,
        }}
      />
    </AbsoluteFill>
  );
};
