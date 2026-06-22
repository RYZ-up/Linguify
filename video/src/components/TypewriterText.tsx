import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const TypewriterText: React.FC<{
  text: string;
  startFrame?: number;
  charsPerSecond?: number;
  style?: React.CSSProperties;
}> = ({ text, startFrame = 0, charsPerSecond = 22, style }) => {
  const frame = useCurrentFrame();
  const elapsedSec = Math.max(0, (frame - startFrame) / 30);
  const count = Math.min(text.length, Math.floor(elapsedSec * charsPerSecond));
  const shown = text.slice(0, count);
  const cursorOpacity = interpolate(frame % 20, [0, 10, 20], [1, 0, 1]);

  return (
    <div style={style}>
      {shown}
      {count < text.length && <span style={{ opacity: cursorOpacity }}>|</span>}
    </div>
  );
};
