import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text
} from 'react-native';
import theme from '../theme';

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={theme.main} />
      <Text style={styles.loadingText}>Loading . . .</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: theme.main,
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default Loading;