import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
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
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default Loading;