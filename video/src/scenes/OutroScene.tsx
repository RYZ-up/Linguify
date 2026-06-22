import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../theme';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const textOpacity = interpolate(frame, [12, 28, 80, 110], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: colors.bg, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 140 }}>
      <div
        style={{
          opacity: textOpacity,
          fontFamily: 'Nunito',
          fontWeight: 600,
          fontSize: 26,
          color: colors.muted,
        }}
      >
        Apprends le français et l'anglais en t'amusant
      </div>
    </AbsoluteFill>
  );
};
