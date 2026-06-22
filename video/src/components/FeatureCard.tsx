import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { colors } from '../theme';

export const FeatureCard: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
  delay?: number;
}> = ({ icon, title, subtitle, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);
  const slide = spring({ frame: local, fps, config: { damping: 14 }, durationInFrames: 18 });
  const opacity = interpolate(local, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        background: colors.s2,
        border: `1px solid ${colors.border}`,
        borderRadius: 24,
        padding: '36px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        width: 720,
        opacity,
        transform: `translateX(${(1 - slide) * 80}px)`,
      }}
    >
      <div
        style={{
          fontSize: 48,
          width: 84,
          height: 84,
          borderRadius: 20,
          background: colors.bg,
          border: `1px solid ${colors.borderHi}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 32, color: colors.text }}>{title}</div>
        <div style={{ fontFamily: 'Nunito', fontWeight: 500, fontSize: 22, color: colors.muted }}>{subtitle}</div>
      </div>
    </div>
  );
};
