import {Divider, Text} from '@rneui/themed';
import moment from 'moment';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {StepCountInterface} from '../../redux/types/step.types';

const {width, height} = Dimensions.get('window');

interface StepCountHistoryListViewProps {
  stepCounts: StepCountInterface[];
}

interface StepCountHistoryCellProps {
  stepCount: StepCountInterface;
}
const StepCountHistoryCell: React.FC<StepCountHistoryCellProps> = ({
  stepCount,
}) => {
  return (
    <View style={styles.cellContainer}>
      <Text>{moment(stepCount.date).format('DD MMM yyyy')}</Text>
      <Text style={styles.stepCount}>{Math.round(stepCount.value)}</Text>
    </View>
  );
};

export const StepCountHistoryListView: React.FC<
  StepCountHistoryListViewProps
> = ({stepCounts}) => {
  if (stepCounts == undefined) return null;
  return (
    <View style={styles.container}>
      {React.Children.toArray(
        stepCounts.map(data => [
          StepCountHistoryCell({stepCount: data}),
          <Divider width={1} color="#ffffff60" />,
        ]),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cellContainer: {
    padding: 10,
    height: 48,
    alignItems: `center`,
    flexDirection: 'row',
  },
  stepCount: {
    fontWeight: `bold`,
    marginLeft: `auto`,
  },
});
