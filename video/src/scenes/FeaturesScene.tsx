import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme';
import { FeatureCard } from '../components/FeatureCard';

export const FeaturesScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <FeatureCard icon="📈" title="5 niveaux" subtitle="De A1 à C2, à ton rythme" delay={0} />
      <FeatureCard icon="⏱" title="Mode chrono" subtitle="Réponds vite, marque des points" delay={12} />
      <FeatureCard icon="⇄" title="FR ⇄ EN" subtitle="Traduis dans les deux sens" delay={24} />
      <FeatureCard icon="🔥" title="Séries & bonus" subtitle="Enchaîne les bonnes réponses" delay={36} />
    </AbsoluteFill>
  );
};
