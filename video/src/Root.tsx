import React from 'react';
import { Composition } from 'remotion';
import { LinguifyDemo } from './LinguifyDemo';
import { WIDTH, HEIGHT, FPS, TOTAL_DURATION } from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LinguifyDemo"
      component={LinguifyDemo}
      durationInFrames={TOTAL_DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
