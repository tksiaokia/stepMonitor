import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../redux/reducers';
import {getStepCount} from '../redux/actions/step.actions';

import {LoadingView} from '../components/base/LoadingView';
import {StepCountHistoryListView} from '../components/stepCount/StepCountHistoryListView';

interface Props {}
export const StepHistoryScreen: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {stepCounts} = useSelector((state: RootState) => state.step);

  var timerID: number = 0;

  useEffect(() => {
    dispatch(getStepCount());
  }, []);

  if (stepCounts == undefined || stepCounts.length == 0) return <LoadingView />;

  return (
    <>
      <View style={styles.container}>
        <StepCountHistoryListView stepCounts={stepCounts} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
