import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import locale from '../localization/locale';
import theme from '../theme';
import Loading from './LoadingComponent';
import { getTypeString } from '../utils/calculation-plan';
import { toDefaultDateString } from '../utils/date';
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

// A string variable for theme. If this is 'undefined', theme uses to default theme.
let themeName = undefined;

// Component Types
export const ENDED_PLANS = 'ENDED_PLANS';
export const CURRENT_PLANS = 'CURRENT_PLANS';

function PlanHistoryList(props) {
  const [isLoading, load] = useState(true);
  const [listType, setListType] = useState(props.navigation.getParam('listType', CURRENT_PLANS));
  const [plans, setPlans] = useState([]);

  // translate function for language
  const t = locale(props.settings.language);

  // change themeName when theme's changed
  useEffect(() => {
    themeName = props.settings.theme;

    props.navigation.setParams({
      headerBackgroundColor: theme(themeName).background
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
                {`${t('PLAN_START_DATE_TEXT')}: ${toDefaultDateString(v.startingDate)}`}
              </Text>
              {
                v.endingDate
                  ? <Text style={styles.listItemBody}>{`${t('PLAN_END_DATE_TEXT')}: ${toDefaultDateString(v.endingDate)}`}</Text>
                  : null
              }
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme(themeName).background
  },
  listContainer: {
    margin: 30
  },
  listItem: {
    backgroundColor: theme(themeName).listItemBackground,
    padding: 20,
    marginBottom: 15,
    borderRadius: 30
  },
  listItemTitle: {
    color: theme(themeName).listItemFontColor,
    fontSize: 18,
  },
  listItemBody: {
    color: theme(themeName).listItemFontColor,
    fontSize: 12
  },
  divider: {
    backgroundColor: theme(themeName).listItemFontColor,
    marginTop: 5,
    marginBottom: 5
  }
});

export default PlanHistoryList;

