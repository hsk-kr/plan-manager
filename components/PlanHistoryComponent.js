import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import locale from '../localization/locale';
import theme from '../theme';
import Loading from './LoadingComponent';
import { CURRENT_PLANS, ENDED_PLANS } from './PlanHistoryListComponent';

// A string variable for theme. If this is 'undefined', theme uses to default theme.
let themeName = undefined;

function PlanHistoryComponent(props) {
  const [isLoading, load] = useState(true);

  // translate function for language
  const t = locale(props.settings.language);

  // change themeName when theme's changed
  useEffect(() => {
    themeName = props.settings.theme;

    props.navigation.setParams({
      headerTitleColor: theme(themeName).main,
      headerBackgroundColor: theme(themeName).background
    });
  }, [props.settings.theme]);

  // change header title to appropriate title depends on language
  useEffect(() => {
    props.navigation.setParams({
      title: t('HEADER_TITLE')
    });
  }, [props.settings.language]);

  // when component's mounted, change isLoading is true
  useEffect(() => {
    load(false);
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.centerized, styles.leftSide]}
        onPress={() => props.navigation.navigate('PlanHistoryList', { listType: CURRENT_PLANS })}>
        <View>
          <Text style={styles.leftSideTitle}>{t('CURRENT_PLANS')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.centerized, styles.rightSide]}
        onPress={() => props.navigation.navigate('PlanHistoryList', { listType: ENDED_PLANS })}>
        <View>
          <Text style={styles.rightSideTitle}>{t('ENDED_PLANS')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  centerized: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSide: {
    backgroundColor: theme(themeName).historyLeftSideBackground
  },
  leftSideTitle: {
    color: theme(themeName).historyLeftSideFont,
    fontSize: 24
  },
  rightSide: {
    backgroundColor: theme(themeName).historyRightSideBackground
  },
  rightSideTitle: {
    color: theme(themeName).historyRightSideFont,
    fontSize: 24
  },
});

export default PlanHistoryComponent;