import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';

import styles, { Colors } from './styles';

// components
import { Header } from '../../components';

export default class Home extends Component {
  render () {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
        <Header />
        <Text style={styles.text}>ColorBlinder - Home screen</Text>
      </View>
    )
  }
}
