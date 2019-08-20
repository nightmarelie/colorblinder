import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export const Header = ({ fontSize = 50 }) => (
  <View style={{ flexDirection: "row" }}>
    <Text style={{ fontSize }}>
      <Text style={[styles.wrapper, { color: "#E64C3C" }]}>c</Text>
      <Text style={[styles.wrapper, { color: "#E57E31" }]}>o</Text>
      <Text style={[styles.wrapper, { color: "#F1C431" }]}>l</Text>
      <Text style={[styles.wrapper, { color: "#68CC73" }]}>o</Text>
      <Text style={[styles.wrapper, { color: "#3998DB" }]}>r</Text>
      <Text style={styles.wrapper}>blinder</Text>
    </Text>
  </View>
);
