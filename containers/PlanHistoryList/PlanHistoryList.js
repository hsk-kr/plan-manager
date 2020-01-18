import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import locale from '../../localization/locale';
import theme from '../../theme';
import Loading from '../../components/Loading';
import { getTypeString } from '../../helpers/calculation-plan';
import { toDefaultDateString } from '../../helpers/date';
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Component Types
export const ENDED_PLANS = 'ENDED_PLANS';
export const CURRENT_PLANS = 'CURRENT_PLANS';

// A string variable for theme. If this is 'undefined', theme uses to default theme.
let themeName = undefined;
let styles = require('./styles').default(theme, themeName); // get styles depend on theme.

function PlanHistoryList(props) {
  const [isLoading, load] = useState(true);
  const [plans, setPlans] = useState([]);

  const listType = props.navigation.getParam('listType', CURRENT_PLANS);

  // translate function for language
  const t = locale(props.settings.language);

  // update theme
  useEffect(() => {
    themeName = props.settings.theme;
    styles = require('./styles').default(theme, themeName);

    props.navigation.setParams({
      headerBackgroundColor: theme(themeName).headerBackground,
      shown: true
    });
  }, [props.settings.theme]);

  // when plans have been updated, update plans
  useEffect(() => {
    setPlans(
      props.plans.plans.filter((v) => (listType === CURRENT_PLANS && !v.endingDate) || (listType === ENDED_PLANS && v.endingDate))
    );
  }, [props.plans.plans]);

  // when component's mounted, change isLoading is true
  useEffect(() => {
    load(false);
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.listContainer}>
        {plans.map((v) => (
          <TouchableOpacity
            key={v.id}
            onPress={() => { props.navigation.navigate('PlanHistoryDetail', { planId: v.id }); }}>
            <View
              style={styles.listItem}>
              <Text style={styles.listItemTitle}>{v.title}</Text>
              <Divider style={styles.divider} />
              <Text style={styles.listItemBody}>
                {`${t('PLAN_TYPES')}: ${getTypeString(t, v.type)}`}
              </Text>
              <Text style={styles.listItemBody}>
                {`${t('PLAN_START_DATE')}: ${toDefaultDateString(v.startingDate)}`}
              </Text>
              {
                v.endingDate
                  ? <Text style={styles.listItemBody}>{`${t('PLAN_END_DATE')}: ${toDefaultDateString(v.endingDate)}`}</Text>
                  : null
              }
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default PlanHistoryList;

