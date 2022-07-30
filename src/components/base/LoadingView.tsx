import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const LoadingView: React.FC<any> = ({}) => {
  return (
    <View style={[styles.container, {justifyContent: `center`}]}>
      <ActivityIndicator size="large" color="#ffffff"></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: `center`,
    padding: 20,
    flexGrow: 1,
  },
});
