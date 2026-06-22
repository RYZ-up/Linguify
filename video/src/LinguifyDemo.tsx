import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { loadFont as loadNunito } from '@remotion/google-fonts/Nunito';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { colors } from './theme';

import { IntroScene } from './scenes/IntroScene';
import { TitleScene } from './scenes/TitleScene';
import { HomeScene } from './scenes/HomeScene';
import { SettingsScene } from './scenes/SettingsScene';
import { GameScene } from './scenes/GameScene';
import { AIScene } from './scenes/AIScene';
import { ResultsScene } from './scenes/ResultsScene';
import { ProfileScene } from './scenes/ProfileScene';
import { FeaturesScene } from './scenes/FeaturesScene';
import { CTAScene } from './scenes/CTAScene';
import { OutroScene } from './scenes/OutroScene';

loadNunito();

const TRANSITION = linearTiming({ durationInFrames: 12 });

export const LinguifyDemo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: colors.bg, fontFamily: 'Nunito' }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <IntroScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={TRANSITION} />

        <TransitionSeries.Sequence durationInFrames={5 * fps}>
          <TitleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={TRANSITION} />

        <TransitionSeries.Sequence durationInFrames={8 * fps}>
          <HomeScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={TRANSITION} />

        <TransitionSeries.Sequence durationInFrames={8 * fps}>
          <SettingsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={TRANSITION} />

        <TransitionSeries.Sequence durationInFrames={10 * fps}>
          <GameScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={TRANSITION} />

        <TransitionSeries.Sequence durationInFrames={8 * fps}>
          <AIScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={TRANSITION} />

        <TransitionSeries.Sequence durationInFrames={8 * fps}>
          <ResultsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={TRANSITION} />

        <TransitionSeries.Sequence durationInFrames={7 * fps}>
          <ProfileScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={TRANSITION} />

        <TransitionSeries.Sequence durationInFrames={8 * fps}>
          <FeaturesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={TRANSITION} />

        <TransitionSeries.Sequence durationInFrames={8 * fps}>
          <CTAScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={TRANSITION} />

        <TransitionSeries.Sequence durationInFrames={4 * fps}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
