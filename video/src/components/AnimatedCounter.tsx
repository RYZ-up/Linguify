import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const AnimatedCounter: React.FC<{
  to: number;
  startFrame?: number;
  durationInFrames?: number;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ to, startFrame = 0, durationInFrames = 30, suffix = '', style }) => {
  const frame = useCurrentFrame();
  const value = Math.round(
    interpolate(frame, [startFrame, startFrame + durationInFrames], [0, to], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  return <span style={style}>{value}{suffix}</span>;
};
