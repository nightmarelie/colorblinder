import React, { Fragment } from 'react';
import { View, TouchableOpacity } from 'react-native';

export const Grid = ({
  size, diffTileIndex, diffTileColor, rgb, onPress,
}) => <Fragment>
    {Array(size)
    .fill(0)
    .map((_, columnIndex) => (
      <View style={{ flex: 1, flexDirection: 'column' }} key={columnIndex}>
        {Array(size)
          .fill(0)
          .map((__, rowIndex) => (
            <TouchableOpacity
              key={`${rowIndex}.${columnIndex}`}
              style={{
                flex: 1,
                backgroundColor:
                    rowIndex === diffTileIndex[0]
                    && columnIndex === diffTileIndex[1]
                      ? diffTileColor
                      : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                margin: 2,
              }}
              onPress={() => onPress(rowIndex, columnIndex)}
            />
          ))}
      </View>
    ))}
  </Fragment>;
