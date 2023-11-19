import { useState } from 'react';

import { Reward, Coordinate } from './game/types';
import { resetGame, updateGamePhase, useGame } from './game/state';
import { styled } from './styled';
import { StatsBar } from './components/StatsBar';
import { Tiles } from '~components/map/Tiles';
import { MapView } from '~components/map/MapView';
import { FoundRewardOverlay } from './components/FoundRewardOverlay';
import { ProgressBar } from './components/ProgressBar';
import { Icon, Stack } from './components/uikit';
import { LevelStartOverlay } from './components/LevelStartOverlay';
import { LevelCompletedOverlay } from './components/LevelCompletedOverlay';

const debug = __DEV__;

export function Main({ initialLocation }: { initialLocation: Coordinate }) {
  const game = useGame();
  const [foundReward, setFoundReward] = useState<Reward | null>(null);
  const [followUserLocation, setFollowUserLocation] = useState(true);
  // const [markersVisible, setMarkersVisible] = useState(true);
  // const lastLocation = useRef<Coordinate>(initialLocation);
  // const mapRef = useRef<RNMapView>(null);

  // function handleUserLocationChange({ nativeEvent }: UserLocationChangeEvent) {
  //   const currentLocation = nativeEvent.coordinate;
  //   if (!currentLocation) return;

  //   const distance = distanceBetweenCoords(
  //     currentLocation,
  //     lastLocation.current
  //   );

  //   // Process the current location if the user has moved enough
  //   if (distance > 10) {
  //     const rewardForTile = game.updateTiles(currentLocation);

  //     if (!foundReward && rewardForTile) {
  //       setFoundReward(rewardForTile);
  //     }
  //   }

  //   if (followUserLocation) {
  //     requestAnimationFrame(() => {
  //       mapRef.current?.animateToRegion({
  //         ...currentLocation,
  //         latitudeDelta: 0.015,
  //         longitudeDelta: 0.015,
  //       });
  //     });
  //   }

  //   lastLocation.current = currentLocation;
  // }

  // function handleRegionChange(region: Region) {
  //   const zoomLevel = Math.round(
  //     Math.log(360 / region.longitudeDelta) / Math.LN2
  //   );

  //   if (zoomLevel < 14) {
  //     setMarkersVisible(false);
  //   } else if (!markersVisible) {
  //     setMarkersVisible(true);
  //   }
  // }

  return (
    <Container>
      <MapView
        followUserLocation={followUserLocation}
        initialLocation={[initialLocation.longitude, initialLocation.latitude]}
      >
        {game.phase === 'play' && <Tiles tiles={game.tiles} />}
      </MapView>

      <Header>
        <FloatingButton onPress={() => setFollowUserLocation((v) => !v)}>
          <Icon
            name="location"
            size={24}
            color={followUserLocation ? 'primary' : 'primaryDark'}
          />
        </FloatingButton>

        <UserAvatar source={require('./assets/images/user-avatar-1.png')} />
      </Header>

      {game.phase === 'start' && (
        <LevelStartOverlay startGame={() => updateGamePhase('play')} />
      )}

      {game.phase === 'play' && (
        <>
          {!!foundReward && (
            <FoundRewardOverlay
              reward={foundReward}
              hide={() => setFoundReward(null)}
            />
          )}

          <Footer axis="y" spacing="xxsmall">
            <ProgressBar
              collectedTiles={game.gameState.collectedTiles}
              boost={game.gameState.simultaneousPlayers > 1}
              stats={game.rewardState}
              onComplete={() => updateGamePhase('stats')}
            />
            <StatsBar stats={game.rewardState} />
          </Footer>

          {debug && (
            <>
              <ResetGameButton onPress={resetGame}>
                <Icon name="reset" size={24} color="primary" />
              </ResetGameButton>

              <FinishGameButton onPress={() => updateGamePhase('stats')}>
                <Icon name="check" size={24} color="primary" />
              </FinishGameButton>
            </>
          )}
        </>
      )}

      {game.phase === 'stats' && (
        <LevelCompletedOverlay
          stats={game.rewardState}
          onContinue={() => updateGamePhase('start')}
        />
      )}
    </Container>
  );
}

// function RewardMarkers({ tiles }: { tiles: Tile[] }) {
//   return (
//     <>
//       {tiles
//         .filter((h) => h.reward && h.isCaptured)
//         .map(({ reward, coordinate }) => (
//           <RewardMarker
//             key={`${coordinate.latitude}-${coordinate.longitude}`}
//             reward={reward as Reward}
//             coordinate={coordinate}
//           />
//         ))}
//     </>
//   );
// }

const Container = styled('View', {
  flex: 1,
  backgroundColor: '#000',
});

const Header = styled('View', {
  flexDirection: 'row',
  position: 'absolute',
  top: 60,
  left: 16,
  right: 16,
  alignItems: 'center',
  justifyContent: 'space-between',
});

const FloatingButton = styled('TouchableOpacity', {
  backgroundColor: '#000',
  width: 40,
  height: 40,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
});

const ResetGameButton = styled(FloatingButton, {
  position: 'absolute',
  top: 112,
  left: 16,
});

const FinishGameButton = styled(FloatingButton, {
  position: 'absolute',
  top: 162,
  left: 16,
});

const UserAvatar = styled('Image', {
  zIndex: 100,
  width: 40,
  height: 40,
  borderRadius: 48,
  borderWidth: 2,
  borderColor: '#FFF500',
});

const Footer = styled(Stack, {
  position: 'absolute',
  bottom: 24,
  left: 16,
  right: 16,
  zIndex: 100,
});
