import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { WeatherInterface, WeatherResponseInterface } from '../../redux/types';
import { Text, ViewTitle } from '../base/Text';

const {width, height} = Dimensions.get('window');

interface WeatherHeaderProps {
  weather: WeatherResponseInterface;
}
export const WeatherHeader: React.FC<WeatherHeaderProps> = ({weather}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>
        {Math.round(weather.current.temp)}°
      </Text>
      <Text variant="h2">{weather.timezone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: '#000000',
  },
  temperature: {
    fontSize: 72,
  },
});
