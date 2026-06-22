import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { colors } from '../theme';
import { Logo } from '../components/Logo';

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bounce = spring({ frame, fps, config: { damping: 6, mass: 0.5 }, durationInFrames: 30 });
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ transform: `translateY(${(1 - bounce) * -20}px)` }}>
        <Logo size={160} appear={false} />
      </div>
      <div
        style={{
          marginTop: 20,
          fontFamily: 'Nunito',
          fontWeight: 900,
          fontSize: 64,
          color: colors.text,
          opacity: textOpacity,
        }}
      >
        Lingu<span style={{ color: colors.yellow }}>ify</span>
      </div>
      <div
        style={{
          marginTop: 16,
          opacity: textOpacity,
          fontFamily: 'Nunito',
          fontWeight: 800,
          fontSize: 34,
          color: colors.bg,
          background: colors.yellow,
          padding: '16px 36px',
          borderRadius: 16,
        }}
      >
        Joue gratuitement
      </div>
    </AbsoluteFill>
  );
};
