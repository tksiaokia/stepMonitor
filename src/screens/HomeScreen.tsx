import {Text, Button, Dialog, Input} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {Linking, Platform, StyleSheet, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../redux/reducers';
import {getStepCount, setStepGoal} from '../redux/actions/step.actions';
import {useFocusEffect} from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';

import moment from 'moment';
import {Icon} from '@rneui/base';
import {LoadingView} from '../components/base/LoadingView';

interface Props {}
export const HomeScreen: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {stepCounts, permissionStatus, stepGoal} = useSelector(
    (state: RootState) => state.step,
  );
  const [dialogVisible, setDialogVisible] = useState(false);
  const [stepGoalValue, onChangeText] = useState('');

  var timerID: number = 0;

  useEffect(() => {
    dispatch(getStepCount());
  }, []);
  useFocusEffect(() => {
    //Something wrong back healthkit backgroung fetch task, it crash my simulator, temporary use interval timer to keep fetching
    timerID = setInterval(() => {
      dispatch(getStepCount());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  });

  const toggleStepGoalDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  // if (permissionStatus == undefined) return <LoadingView />;

  // if (!permissionStatus)
  //   return (
  //     <View style={styles.permissonContainer}>
  //       <Text>
  //         Please allow health permission in order to get your step count.
  //       </Text>
  //       <Button
  //         radius={5}
  //         style={styles.button}
  //         onPress={() => {
  //           if (Platform.OS === 'ios') {
  //             Linking.openURL('app-settings:');
  //           }
  //         }}>
  //         Go to settings
  //       </Button>
  //     </View>
  //   );

  if (stepCounts == undefined || stepCounts.length == 0) return <LoadingView />;

  let todayStep = stepCounts[0];
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.todayText}>
          {moment(todayStep.startDate).format('DD MMM yyyy')}
        </Text>
        <CircularProgress
          value={todayStep.value}
          radius={120}
          duration={1000}
          progressValueColor={'#ecf0f1'}
          maxValue={Math.max(stepGoal, todayStep.value)}
          title={'Steps'}
          titleColor={'white'}
          titleStyle={{fontWeight: 'bold'}}
          activeStrokeSecondaryColor="yellow"
          inActiveStrokeColor="black"
          dashedStrokeConfig={{
            count: 50,
            width: 4,
          }}
        />
        <View style={styles.stepGoalContainer}>
          <Text style={styles.stepGoalText}>Step Goal: {stepGoal}</Text>
          <Icon
            style={{padding: 8}}
            name="cog"
            type="font-awesome-5"
            size={20}
            color={'white'}
            onPress={() => {
              toggleStepGoalDialog();
            }}
          />
        </View>

        <Dialog
          isVisible={dialogVisible}
          onBackdropPress={toggleStepGoalDialog}>
          <Dialog.Title title="Step Goal" />
          <Input
            onChangeText={onChangeText}
            keyboardType="number-pad"
            defaultValue={stepGoal.toString()}
          />
          <Dialog.Actions>
            <Dialog.Button
              title="CONFIRM"
              onPress={() => {
                dispatch(setStepGoal(Number.parseInt(stepGoalValue) || 0));
                toggleStepGoalDialog();
              }}
            />
            <Dialog.Button title="CANCEL" onPress={toggleStepGoalDialog} />
          </Dialog.Actions>
        </Dialog>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: `center`,
    padding: 20,
    flexGrow: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  todayText: {
    marginTop: 20,
    marginBottom: 100,
    fontSize: 24,
  },
  stepGoalContainer: {
    marginBottom: 20,
    marginTop: 20,
    alignItems: `center`,
    flexDirection: `row`,
  },
  stepGoalText: {
    fontSize: 18,
  },
  permissonContainer: {
    justifyContent: `center`,
    padding: 20,
    flexGrow: 1,
  },
  button: {
    marginTop: 20,
  },
});
