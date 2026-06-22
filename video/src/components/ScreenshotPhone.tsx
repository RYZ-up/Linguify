import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../theme';

type Redact = { top: number; left: number; width: number; height: number };

export const ScreenshotPhone: React.FC<{ src: string; redact?: Redact[] }> = ({ src, redact }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 }, durationInFrames: 18 });
  const zoom = interpolate(frame, [0, durationInFrames], [1.02, 1.05]);
  const panY = interpolate(frame, [0, durationInFrames], [-4, -10]);

  return (
    <div
      style={{
        width: 420,
        height: 920,
        borderRadius: 18,
        background: colors.s1,
        border: `2px solid ${colors.s3}`,
        boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
        padding: 10,
        position: 'relative',
        transform: `scale(${entrance})`,
        opacity: entrance,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
          overflow: 'hidden',
          background: colors.bg,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            transform: `scale(${zoom}) translateY(${panY}px)`,
          }}
        />
        {redact?.map((r, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${r.top}%`,
              left: `${r.left}%`,
              width: `${r.width}%`,
              height: `${r.height}%`,
              background: colors.s2,
              borderRadius: 8,
            }}
          />
        ))}
      </div>
    </div>
  );
};
