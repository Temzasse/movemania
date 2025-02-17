import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

import { Reward } from '../game/types';
import { Overlay, Text } from './uikit';
import { rewardAssets } from '../assets/assets';
import { Stack } from './uikit/Stack';

const animationSpeedup: Record<Reward, number> = {
  coin: 2,
  chest: 1,
  gem: 1,
  key: 2,
};

export function FoundRewardOverlay({
  reward,
  hide,
}: {
  reward: Reward;
  hide: () => void;
}) {
  const lottieRef = useRef<LottieView>(null);
  const assets = rewardAssets[reward];

  function handleAnimationFinish() {
    hide();
  }

  useEffect(() => {
    async function handle() {
      const { sound } = await Audio.Sound.createAsync(assets.sound);
      sound.playAsync().catch((e) => console.log(e));
      lottieRef.current?.play();
    }

    const timer = setTimeout(handle, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Overlay>
      <Stack axis="y" spacing="none" style={{ margin: 26 }}>
        <Text style={{ textAlign: 'center' }}>Found a {reward}!</Text>
        <LottieView
          ref={lottieRef}
          loop={false}
          autoPlay={false}
          speed={animationSpeedup[reward]}
          style={{ width: 200, height: 200 }}
          source={assets.animation}
          onAnimationFinish={handleAnimationFinish}
        />
      </Stack>
    </Overlay>
  );
}
