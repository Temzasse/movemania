import React from 'react';
import { Image } from 'react-native';
import { BlurView } from 'expo-blur';

import { Reward, RewardState } from '../game/types';
import { styled } from '../styled';
import { rewardAssets } from '../assets/assets';
import { Text } from './uikit';

export function StatsBar({ stats }: { stats: Record<Reward, RewardState> }) {
  return (
    <BlurView tint="dark" intensity={40}>
      <StatsBarContainer>
        {Object.entries(stats).map(([key, value]) => (
          <Square key={key}>
            <StatIcon source={rewardAssets[key as Reward].image} />
            <StatText
              variant="button"
              color={value.foundCount === 0 ? 'textMuted' : 'primary'}
            >
              {value.foundCount}
            </StatText>
          </Square>
        ))}
      </StatsBarContainer>
    </BlurView>
  );
}

const StatsBarContainer = styled('View', {
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 28,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

const Square = styled('View', {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 20,
  padding: 8,
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
});

const StatIcon = styled(Image, {
  width: 32,
  height: 32,
});

const StatText = styled(Text, {
  fontSize: 32,
  marginTop: 4, // stupid fix for visually centering the text...
});
