import {Divider, Image, Text} from '@rneui/themed';
import moment from 'moment';
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {weatherImageUrl} from '../../constants/constant';

import {WeatherForecastInterface} from '../../redux/types';

const {width, height} = Dimensions.get('window');

interface WeatherForecastListViewProps {
  weatherForecasts: WeatherForecastInterface[];
}

interface WeatherForecastCellProps {
  weatherForecast: WeatherForecastInterface;
}
const WeatherForecastCell: React.FC<WeatherForecastCellProps> = ({
  weatherForecast,
}) => {
  return (
    <View key={weatherForecast.dt} style={styles.cellContainer}>
      <Text style={styles.day}>
        {' '}
        {moment.unix(weatherForecast.dt).format('dddd')}
      </Text>
      <Image
        containerStyle={styles.icon}
        source={{
          uri: weatherImageUrl.replace(
            '{iconName}',
            weatherForecast.weather[0].icon,
          ),
        }}></Image>
      <View style={styles.temperature}>
        <Text style={{marginEnd: 15}}>
          {Math.round(weatherForecast.temp.max)}
        </Text>
        <Text style={{opacity: 0.7}}>
          {Math.round(weatherForecast.temp.min)}
        </Text>
      </View>
    </View>
  );
};

export const WeatherForecastListView: React.FC<
  WeatherForecastListViewProps
> = ({weatherForecasts}) => {
  if (weatherForecasts == undefined) return null;
  return (
    <View style={styles.container}>
      {weatherForecasts.map(data =>
        WeatherForecastCell({weatherForecast: data}),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  cellContainer: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: `center`,
  },
  day: {
    marginRight: `auto`,
  },
  temperature: {
    flexDirection: 'row',
    marginLeft: `auto`,
  },
  icon: {
    position: `absolute`,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 30,
    height: 20,
  },
});
