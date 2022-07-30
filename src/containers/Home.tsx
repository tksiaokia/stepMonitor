import {Divider, Text, Button, Tab} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CurrentWeatherHourView} from '../components/weather/CurrentWeatherHourView';
import {WeatherForecastListView} from '../components/weather/WeatherForecastListView';

import {WeatherHeader} from '../components/weather/WeatherHeader';
import {getWeather} from '../redux/actions/weather.actions';
import {RootState} from '../redux/reducers';
import {getLocation} from '../redux/actions/location.actions';
import RNLocation from 'react-native-location';

const {height} = Dimensions.get('window');

interface Props {}
export const Home: React.FC<Props> = props => {
  const [index, setIndex] = useState(0);

  useEffect(() => {}, []);

  return (
    <>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary">
        <Tab.Item
          title="Recent"
          titleStyle={{fontSize: 12}}
          icon={{name: 'timer', type: 'ionicon', color: 'white'}}
        />
        <Tab.Item
          title="favorite"
          titleStyle={{fontSize: 12}}
          icon={{name: 'heart', type: 'ionicon', color: 'white'}}
        />
        <Tab.Item
          title="cart"
          titleStyle={{fontSize: 12}}
          icon={{name: 'cart', type: 'ionicon', color: 'white'}}
        />
      </Tab>
    </>
  );
};

const styles = StyleSheet.create({
  locationPermisson: {
    justifyContent: `center`,
    padding: 20,
    flexGrow: 1,
    height: height - 56,
  },
  scrollView: {
    flexGrow: 1,
    height: height - 56,
  },
  button: {
    marginTop: 20,
  },
});
