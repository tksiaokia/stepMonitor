import {Divider} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CurrentWeatherHourView} from '../components/weather/CurrentWeatherHourView';
import {WeatherForecastListView} from '../components/weather/WeatherForecastListView';

import {WeatherHeader} from '../components/weather/WeatherHeader';
import {getWeather} from '../redux/actions/weather.actions';
import {RootState} from '../redux/reducers';

const theme = 'dark';
const {height} = Dimensions.get('window');
const userId = '1'; // id of logged user (should ideally be retreived from server and saved in localstorage/redux)

interface Props {}
export const Home: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {weatherResponse} = useSelector((state: RootState) => state.weather);
  const [initialStory, setInitialStory] = useState<number>(0);
  const [isStoriesModalOpen, setIsStoriesModalOpen] = useState<boolean>(false);
  const [isMyStoryModalOpen, setIsMyStoryModalOpen] = useState<boolean>(false);

  function refreshFeed() {
    dispatch(getWeather());
  }

  useEffect(() => {
    refreshFeed();
  }, []);
  let divider = <Divider width={1} color={'#ffffff60'} />;
  RNLocation;
  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <WeatherHeader weather={weatherResponse} />
        {divider}
        <CurrentWeatherHourView weather={weatherResponse} />
        {divider}
        <WeatherForecastListView weatherForecasts={weatherResponse.daily} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: height - 56,
  },
});
