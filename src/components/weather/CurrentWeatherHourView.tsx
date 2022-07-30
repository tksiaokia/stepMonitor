import {Divider, Image, Text} from '@rneui/themed';
import moment from 'moment';
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {weatherImageUrl} from '../../constants/constant';

import {
  CurrentWeatherInterface,
  WeatherResponseInterface,
} from '../../redux/types';

const {width, height} = Dimensions.get('window');

interface CurrentWeatherHourViewProps {
  weather: WeatherResponseInterface;
}
interface WeatherHourViewProps {
  weather: CurrentWeatherInterface;
  isNow: boolean;
}
const WeatherHourView: React.FC<WeatherHourViewProps> = ({weather, isNow}) => {
  let temp = Math.round(weather.temp);
  return (
    <View key={weather.dt} style={styles.hourContainer}>
      {isNow ? (
        <Text style={{fontWeight: 'bold', fontSize: 17}}>Now</Text>
      ) : (
        <Text style={{fontSize: 17}}>
          {moment.unix(weather.dt).format('HH')}
        </Text>
      )}
      <Image
        containerStyle={styles.icon}
        source={{
          uri: weatherImageUrl.replace('{iconName}', weather.weather[0].icon),
        }}></Image>

      {isNow ? (
        <Text style={{fontWeight: 'bold', fontSize: 17}}>{temp}°</Text>
      ) : (
        <Text style={{fontSize: 17}}>{temp}°</Text>
      )}
    </View>
  );
};

export const CurrentWeatherHourView: React.FC<CurrentWeatherHourViewProps> = ({
  weather,
}) => {
  if (weather.hourly == undefined) return null;
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {weather.hourly.map((data, index) =>
          WeatherHourView({weather: data, isNow: index == 0}),
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  hourContainer: {
    alignItems: 'center',
    padding: 8,
  },
  highLowTempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    margin: 5,
    padding: 5,
    width: 30,
    aspectRatio: 1,
  },
});
