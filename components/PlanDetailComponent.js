import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import {
  Button,
  Divider
} from 'react-native-elements';
import locale from '../localization/locale';
import theme from '../theme';
import Loading from './LoadingComponent';
import InputNumber from './InputNumberComponent';
import { getProgressRate } from '../utils/calculation-plan';
import { toDefaultDateString } from '../utils/date';

// A string variable for theme. If this is 'undefined', theme uses to default theme.
let themeName = undefined;

function PlanDetailComponent(props) {
  const [isLoading, load] = useState(true);
  const [plan, setPlan] = useState(null);
  const [progressCount, setProgressCount] = useState(0);
  const [progressTime, setProgressTime] = useState({ hours: 0, minutes: 0 });

  // translate function for language
  const t = locale(props.settings.language);

  // change themeName when theme's changed
  useEffect(() => {
    themeName = props.settings.theme;

    props.navigation.setParams({
      headerBackgroundColor: theme(themeName).background
    });
  }, [props.settings.theme]);

  // when component's mounted, change isLoading is true
  useEffect(() => {
    load(false);
    props.plansUpToDate(); // up to date plans

    // get paramaeter from navagation and get plan by planId.
    const planId = props.navigation.getParam('planId', null);

    if (planId !== null) {
      setPlan(props.plans.plans.filter((p) => p.id === planId)[0]);
    }
  }, []);

  if (plan === null || isLoading) {
    return <Loading />
  }

  // handlers
  const endPlanHandler = () => {
    Alert.alert(
      t('ALERT_TITLE'),
      t('ALERT_END_PLAN_QUESTION'),
      [
        {
          text: t('CANCEL'),
          style: 'cancel'
        },
        {
          text: t('OK'),
          onPress: () => {
            props.endPlan(plan.id);
            props.navigation.goBack();
          }
        }
      ],
      { cancelable: false }
    );
  };

  const addProgressPlanHandler = () => {
    let progress = 0;

    if (plan.unit === 'count') {
      if (!isNaN(progressCount)) {
        progress = Number(progressCount);
      }
    } else if (plan.unit === 'time') {
      if (!isNaN(progressTime.hours) && !isNaN(progressTime.minutes)) {
        progress = (Number(progressTime.hours) * 3600) + (Number(progressTime.minutes) * 60);
      }
    } else {
      progress = plan.progress === 0 ? 1 : 0;
    }

    props.addProgressPlan({ id: plan.id, progress });
    props.navigation.goBack();
  };

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.centerView}>
          <Text style={styles.planTitle}>{plan.title}</Text>
        </View>
        <Divider style={styles.marginTopBottom} />
        <View style={styles.horizontalView}>
          <Text style={styles.groupLabel}>{t('PLAN_START_DATE_TEXT')}: </Text>
          <Text style={styles.groupLabel}>{toDefaultDateString(plan.startingDate)}</Text>
        </View>
        <View style={styles.horizontalView}>
          <Text style={styles.groupLabel}>{t('PLAN_TYPES')}: </Text>
          <Text style={styles.groupLabel}>
            {
              /* Render depends on the type */
              plan.type === 'daily'
                ? t('PLAN_TYPES_DAILY')
                : plan.type === 'weekly'
                  ? t('PLAN_TYPES_WEEKLY')
                  : t('PLAN_TYPES_MONTHLY')
            }
          </Text>
        </View>
        {
          /* If a unit of the plan is 'once', It doesn't render */
          plan.unit !== 'once'
            ?
            <>
              <View style={styles.horizontalView}>
                <Text style={styles.groupLabel}>{t('CURRENT_PROGRESS_TEXT')}: </Text>
                <Text style={styles.groupLabel}>
                  {
                    /* Render depends on the unit */
                    plan.unit === 'count'
                      ? `${plan.progress} ${t('COUNT_SUFFIX')} / ${getProgressRate(plan.progress, plan.goal)}%`
                      : `${Math.floor(plan.progress / 3600)}${t('HOURS_TEXT')} ${Math.floor(plan.progress % 3600 / 60)}${t('MINUTES_TEXT')} / ${getProgressRate(plan.progress, plan.goal)}%`
                  }
                </Text>
              </View>
              <View style={styles.horizontalView}>
                <Text style={styles.groupLabel}>{t('GOAL_TEXT')}: </Text>
                <Text style={styles.groupLabel}>
                  {
                    /* Render depends on the unit */
                    plan.unit === 'count'
                      ? `${plan.goal} ${t('COUNT_SUFFIX')}`
                      : `${Math.floor(plan.goal / 3600)}${t('HOURS_TEXT')} ${Math.floor(plan.goal % 3600 / 60)}${t('MINUTES_TEXT')}`
                  }
                </Text>
              </View>
            </>
            :
            null
        }
        <Divider style={styles.marginTopBottom} />
        <Text style={styles.explanation}>{t('HOW_TO_APPLY_PROGRESS')}</Text>
        <View style={[styles.horizontalView, { justifyContent: 'center', alignItems: 'center' }]}>
          {
            plan.unit === 'count'
              ?
              (
                <>
                  <InputNumber
                    notAllowNegative
                    value={progressCount.toString()}
                    onChangeText={setProgressCount}
                  />
                  <Text>{t('COUNT_SUFFIX')}</Text>
                </>
              )
              : plan.unit === 'time'
                ?
                (
                  <>
                    <InputNumber
                      notAllowNegative
                      value={progressTime.hours.toString()}
                      onChangeText={(v) => setProgressTime({ ...progressTime, hours: v })}
                    />
                    <Text> {t('HOURS_TEXT')} </Text>
                    <InputNumber
                      notAllowNegative
                      value={progressTime.minutes.toString()}
                      onChangeText={(v) => setProgressTime({ ...progressTime, minutes: v })}
                    />
                    <Text> {t('MINUTES_TEXT')} </Text>
                  </>
                )
                : null
          }
        </View>
        <Divider style={styles.marginTopBottom} />
        <View>
          <Button
            title={t('APPLY_PROGRESS_TEXT')}
            buttonStyle={styles.applyProgressButton}
            onPress={addProgressPlanHandler}
          />
          <Button
            title={t('VIEW_PLAN_HISTORY_TEXT')}
            buttonStyle={styles.historyButton}
          />
          <Button
            title={t('END_PLAN_TEXT')}
            buttonStyle={styles.endPlanButton}
            onPress={endPlanHandler}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 30
  },
  applyProgressButton: {
    backgroundColor: '#05c46b',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  historyButton: {
    backgroundColor: '#575fcf',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  endPlanButton: {
    backgroundColor: '#ff3f34',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  planTitle: {
    color: theme(themeName).main,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  marginTopBottom: {
    marginTop: 10,
    marginBottom: 10,
  },
  horizontalView: {
    flex: 1,
    flexDirection: 'row'
  },
  groupLabel: {
    fontSize: 13,
    color: theme(themeName).main
  },
  explanation: {
    color: '#808e9b',
    fontSize: 12,
    margin: 10,
  }
});

export default PlanDetailComponent;