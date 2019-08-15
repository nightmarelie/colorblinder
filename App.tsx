import React, { Component } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Routes from './screens/Routes';

export default class App extends Component {
  state = {
    isFontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'dogbyte': require('./assets/fonts/dogbyte.otf'),
    });
    this.setState({ isFontLoaded: true });
  }

  render () {
    if (!this.state.isFontLoaded) {
      return <AppLoading />
    } else {
      return <Routes />
    }
  }
}
