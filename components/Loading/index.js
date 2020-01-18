import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import styles from './styles';

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={theme.main} />
      <Text style={styles.loadingText}>Loading . . .</Text>
    </View>
  );
}

export default Loading;