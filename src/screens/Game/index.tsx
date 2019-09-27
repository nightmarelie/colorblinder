import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Text, Image, Animated, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';

import { Header, Grid, BottomBar } from '../../components';
import styles from './styles';
import { 
  generateRGB,
  mutateRGB,
  storeData,
  retrieveData,
  shakeAnimation as shake,
  GameState,
} from '../../utilities';

type State = {
  points: number;
  timeLeft: number;
  rgb: {
    r: number,
    g: number,
    b: number,
  },
  size: number,
  diffTileIndex: number[],
  diffTileColor: string,
  gameState: GameState,
  bestPoints: number;
  bestTime: number;
}

export default class Game extends Component<{ navigation: any }, State> {
  public state = {
    points: 0,
    timeLeft: 15,
    rgb: generateRGB(),
    size: 2,
    diffTileIndex: [],
    diffTileColor: undefined,
    gameState: GameState.INGAME,
    shakeAnimation: new Animated.Value(0),
    bestPoints: 0,
    bestTime: 0,
  };

  private interval;

  private backgroundMusic;
  private btnFX;
  private btnTileCorrect;
  private btnTileWrong;
  private btnPauseIn;
  private btnPauseOut;

  private loseMusic;

  async componentWillMount() {
    this.backgroundMusic = new Audio.Sound();
    this.btnFX = new Audio.Sound();
    this.btnTileCorrect = new Audio.Sound();
    this.btnTileWrong = new Audio.Sound();
    this.btnPauseIn = new Audio.Sound();
    this.btnPauseOut = new Audio.Sound();
    this.loseMusic = new Audio.Sound();
    try {
      await this.backgroundMusic.loadAsync(require("../../../assets/music/Komiku_BattleOfPogs.mp3"));
      await this.btnFX.loadAsync(require("../../../assets/sfx/button.wav"));
      await this.btnTileCorrect.loadAsync(require("../../../assets/sfx/tile_tap.wav"));
      await this.btnTileWrong.loadAsync(require("../../../assets/sfx/tile_wrong.wav"));
      await this.btnPauseIn.loadAsync(require("../../../assets/sfx/pause_in.wav"));
      await this.btnPauseOut.loadAsync(require("../../../assets/sfx/pause_out.wav"));
      await this.loseMusic.loadAsync(require("../../../assets/sfx/lose.wav"));
      await this.backgroundMusic.setIsLoopingAsync(true);
      await this.backgroundMusic.playAsync();
      retrieveData('highScore').then(val => this.setState({ bestPoints: +val || 0 }));
      retrieveData('bestTime').then(val => this.setState({ bestTime: +val || 0 }));
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
    this.generateNewRound();
    this.interval = setInterval(async () => {
      if (this.state.gameState === GameState.INGAME) {
        if (this.state.timeLeft > this.state.bestTime) {
          this.setState(state => ({ bestTime: state.timeLeft }));
          storeData('bestTime', this.state.timeLeft);
        }
        if (this.state.timeLeft <= 0) {
          this.loseMusic.replayAsync();
          this.backgroundMusic.stopAsync();
          if (this.state.points > this.state.bestPoints) {
            this.setState(state => ({ bestPoints: state.points }));
            storeData('highScore', this.state.points);
          }
          this.setState({ gameState: GameState.LOST });
        } else {
          this.setState({ timeLeft: this.state.timeLeft - 1 });
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  generateSizeIndex = size => {
    return Math.floor(Math.random() * size);
  };

  onTilePress = (rowIndex, columnIndex) => {
    const { diffTileIndex, points, timeLeft, shakeAnimation } = this.state;
    const [ diffRowIndex, diffColumnIndex ] = diffTileIndex;
    if(rowIndex == diffRowIndex && columnIndex == diffColumnIndex) {
      this.btnTileCorrect.replayAsync();
      // good tile
      this.setState(
        { points: points + 1, timeLeft: timeLeft + 2 }, 
        () => this.generateNewRound()
      );
    } else {
      this.btnTileWrong.replayAsync();
      // wrong tile

      shake(shakeAnimation);
      this.setState({ timeLeft: timeLeft - 2 });
    }
  }

  generateNewRound = () => {
    const RGB = generateRGB();
    const mRGB = mutateRGB(RGB);
    const { points } = this.state;
    const size = Math.min(Math.max(Math.floor(Math.sqrt(points)), 2), 10);
    this.setState({
      size,
      diffTileIndex: [this.generateSizeIndex(size), this.generateSizeIndex(size)],
      diffTileColor: `rgb(${mRGB.r}, ${mRGB.g}, ${mRGB.b})`,
      rgb: RGB
    });
  };

  onBottomBarPress = async () => {
    switch(this.state.gameState) {
      case GameState.INGAME: {
        this.btnPauseIn.replayAsync();
        this.setState({ gameState: GameState.PAUSED });
        break;
      }
      case GameState.PAUSED: {
        this.btnPauseOut.replayAsync();
        this.setState({ gameState: GameState.INGAME });
        break;
      }
      case GameState.LOST: {
        this.backgroundMusic.replayAsync();
        await this.setState({ points: 0, timeLeft: 15, size: 2 });
        this.generateNewRound();
        this.setState({
          gameState: GameState.INGAME,
        })
        break;
      }
    }
  };

  onExitPress = () => {
    this.btnFX.replayAsync();
    this.backgroundMusic.stopAsync();
    this.props.navigation.goBack();
  };

  render () {
    const { 
      rgb,
      size,
      diffTileIndex,
      diffTileColor,
      points,
      gameState,
      shakeAnimation,
      bestPoints,
      bestTime,
      timeLeft,
    } = this.state;

    const bottomIcon =
      gameState === GameState.INGAME
        ? require("../../../assets/icons/pause.png")
        : gameState === GameState.PAUSED
          ? require("../../../assets/icons/play.png")
        : require("../../../assets/icons/replay.png");

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <Header fontSize={50} />
        </View>
        <View style={styles.tilesSection}>
          <Animated.View style={[styles.tiles, { left: shakeAnimation }]}>
            {gameState === GameState.INGAME ? (
              <Grid
                size={size}
                diffTileIndex={diffTileIndex}
                diffTileColor={diffTileColor}
                rgb={rgb}
                onPress={this.onTilePress}
              />
            ) : (
              <View style={styles.pausedContainer}>
                {gameState === GameState.PAUSED ? (
                  <Fragment>
                    <Image
                      source={require("../../../assets/icons/mug.png")}
                      style={styles.pausedIcon}
                    />
                    <Text style={styles.pausedText}>COVFEFE BREAK</Text>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Image
                      source={require("../../../assets/icons/dead.png")}
                      style={styles.pausedIcon}
                    />
                    <Text style={styles.pausedText}>U DED</Text>
                  </Fragment>
                )}
                <TouchableOpacity onPress={this.onExitPress}>
                  <Image
                    source={require("../../../assets/icons/escape.png")}
                    style={styles.exitIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </View>
        <View style={{ flex: 2 }}>
          <BottomBar
            points={points}
            bestPoints={bestPoints}
            timeLeft={timeLeft}
            bestTime={bestTime}
            onBottomBarPress={this.onBottomBarPress}
            gameState={gameState}
          />
        </View>
      </SafeAreaView>
    )
  }
}