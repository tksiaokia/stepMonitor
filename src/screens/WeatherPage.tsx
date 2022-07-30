import {Divider, Text, Button} from '@rneui/themed';
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

const theme = 'dark';
const {height} = Dimensions.get('window');
const userId = '1'; // id of logged user (should ideally be retreived from server and saved in localstorage/redux)

interface Props {}
export const Home: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {weatherResponse} = useSelector((state: RootState) => state.weather);
  const {location, status} = useSelector((state: RootState) => state.location);
  const [initialStory, setInitialStory] = useState<number>(0);
  const [isStoriesModalOpen, setIsStoriesModalOpen] = useState<boolean>(false);
  const [isMyStoryModalOpen, setIsMyStoryModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (location != null) {
      dispatch(getWeather(location.lat, location.long));
    } else {
      dispatch(getLocation());
    }
  }, [location]);

  if (status == undefined) return null;

  if (!status)
    return (
      <View style={styles.locationPermisson}>
        <Text>
          Please allow location permission in order to get weather of your
          location
        </Text>
        <Button
          radius={5}
          style={styles.button}
          onPress={() => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            }
          }}>
          Go to settings
        </Button>
      </View>
    );

  if (weatherResponse.current == undefined) return null;

  let divider = <Divider width={1} color={'#ffffff60'} />;
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
