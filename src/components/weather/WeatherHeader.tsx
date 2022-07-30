import {Divider, Text} from '@rneui/themed';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {WeatherInterface, WeatherResponseInterface} from '../../redux/types';
import {CurrentWeatherHourView} from './CurrentWeatherHourView';
import {
  WeatherForecastCell,
  WeatherForecastListView,
} from './WeatherForecastListView';

const {width, height} = Dimensions.get('window');

interface WeatherHeaderProps {
  weather: WeatherResponseInterface;
}

export const WeatherHeader: React.FC<WeatherHeaderProps> = ({weather}) => {
  if (weather.current == undefined) return null;

  return (
    <View style={styles.container}>
      <Text h3>{weather.timezone.split('/')[1].replace('_', ' ')}</Text>
      <Text h4>{weather.current.weather[0].description}</Text>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>
          {Math.round(weather.current.temp)}
        </Text>
        <Text style={styles.temperatureIcon}>°</Text>
      </View>

      <View style={styles.highLowTempContainer}>
        <Text style={[styles.smallTemperature, {marginEnd: 10}]}>
          H:{Math.round(weather.daily[0].temp.max)}°
        </Text>
        <Text style={styles.smallTemperature}>
          L{Math.round(weather.daily[0].temp.min)}°
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    alignItems: 'center',
    marginBottom: 50,
  },
  highLowTempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  temperatureContainer: {
    flexDirection: `row`,
  },
  temperature: {
    fontSize: 72,
  },
  temperatureIcon: {
    fontSize: 72,
    position: 'absolute',
    right: -30,
  },
  smallTemperature: {
    fontSize: 14,
  },
});
