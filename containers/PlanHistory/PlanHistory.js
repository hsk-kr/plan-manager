import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import locale from '../../localization/locale';
import theme from '../../theme';
import Loading from '../../components/Loading';
import { CURRENT_PLANS, ENDED_PLANS } from '../PlanHistoryList';

// A string variable for theme. If this is 'undefined', theme uses to default theme.
let themeName = undefined;
let styles = require('./styles').default(theme, themeName); // get styles depend on theme.

function PlanHistory(props) {
  const [isLoading, load] = useState(true);

  // translate function for language
  const t = locale(props.settings.language);

  // update theme
  useEffect(() => {
    themeName = props.settings.theme;
    styles = require('./styles').default(theme, themeName);

    props.navigation.setParams({
      headerTitleColor: theme(themeName).headerTitle,
      headerBackgroundColor: theme(themeName).headerBackground,
      shown: true
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

export default PlanHistory;