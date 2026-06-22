import React from 'react';
import { staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../theme';

export const ZoomCallout: React.FC<{
  src: string;
  posX?: number;
  posYFrom?: number;
  posYTo?: number;
  sizePercent?: number;
}> = ({ src, posX = 50, posYFrom = 48, posYTo = 56, sizePercent = 150 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 }, durationInFrames: 18 });
  const posY = interpolate(frame, [0, durationInFrames], [posYFrom, posYTo]);

  return (
    <div
      style={{
        width: 460,
        height: 760,
        borderRadius: 28,
        overflow: 'hidden',
        border: `2px solid ${colors.teal}`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        transform: `scale(${entrance})`,
        opacity: entrance,
        backgroundImage: `url(${staticFile(src)})`,
        backgroundSize: `auto ${sizePercent}%`,
        backgroundPosition: `${posX}% ${posY}%`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: colors.bg,
      }}
    />
  );
};
