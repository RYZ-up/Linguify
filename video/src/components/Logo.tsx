import React from 'react';
import { Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { colors } from '../theme';

export const Logo: React.FC<{ size?: number; appear?: boolean; glow?: boolean }> = ({
  size = 220,
  appear = true,
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = appear
    ? spring({ frame, fps, config: { damping: 12, mass: 0.6 }, durationInFrames: 20 })
    : 1;
  const opacity = appear ? interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }) : 1;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `scale(${scale})`,
        filter: glow ? `drop-shadow(0 0 ${size * 0.18}px ${colors.yellow}55)` : undefined,
      }}
    >
      <Img src={staticFile('logo.png')} style={{ width: size, height: size, borderRadius: size * 0.22 }} />
    </div>
  );
};
