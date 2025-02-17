import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { styled } from '../styled';
import { Reward, RewardState } from '../game/types';
import { Stack } from './uikit/Stack';
import { Text } from './uikit';

const getExpByReward = (reward: Reward) => {
  switch (reward) {
    case 'coin':
      return 5;
    case 'gem':
      return 10;
    case 'key':
      return 20;
    case 'chest':
      return 30;
    default:
      return 0;
  }
};

export function ProgressBar({
  collectedTiles,
  boost = true,
  stats,
  onComplete,
}: {
  collectedTiles: number;
  boost: boolean;
  stats: Record<Reward, RewardState>;
  onComplete: () => void;
}) {
  const getExp = (stats: Record<Reward, RewardState>) => {
    if (collectedTiles === 0) return 0;
    let exp = 0;
    Object.entries(stats).forEach(([key, value]) => {
      exp += value.foundCount * getExpByReward(key as Reward);
    });
    exp += collectedTiles;
    return Math.min(exp, 100);
  };

  const exp = getExp(stats);
  const progress = useSharedValue(0);
  const height = useSharedValue(8);

  useEffect(() => {
    progress.value = withTiming(exp, { duration: 100 });
  }, [exp, stats]);

  useEffect(() => {
    if (progress.value === 100) {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [progress.value]);

  const scale = useSharedValue(1);

  useEffect(() => {
    if (boost) {
      height.value = withRepeat(
        withSequence(
          withTiming(9.5, { duration: 500 }),
          withTiming(8, { duration: 500 })
        ),
        -1
      );
    } else {
      scale.value = 1;
    }
  }, [boost]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: `${progress.value}%`,
    };
  });

  return (
    <Stack axis="y" spacing="none">
      {boost && (
        <Boost>
          <Text
            variant="button"
            color="buttonText"
            style={{
              fontSize: 18,
            }}
          >
            Boost
          </Text>
        </Boost>
      )}

      <Stack
        axis="x"
        spacing="xxsmall"
        align="center"
        style={{ paddingLeft: 12, paddingRight: 16 }}
      >
        <Image source={require('../assets/images/boost.png')} />
        <Container>
          <Progress
            style={[progressStyle, boost && { shadowColor: '#00FF29' }]}
          />
        </Container>
      </Stack>
    </Stack>
  );
}

const Container = styled(View, {
  flex: 1,
  height: 8,
  borderRadius: 999,
  backgroundColor: '#00000080',
});

const Progress = styled(Animated.View, {
  borderRadius: 999,
  backgroundColor: '#00FF29',
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.8,
  shadowRadius: 16,
});

const Boost = styled(View, {
  borderRadius: 4,
  position: 'absolute',
  backgroundColor: '#00FF29',
  right: 10,
  bottom: 25,
  paddingHorizontal: 3,
  paddingVertical: 1,
});
