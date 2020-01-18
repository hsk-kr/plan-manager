import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import locale from '../../localization/locale';
import theme from '../../theme';
import Loading from '../../components/Loading';
import InputNumber from '../../components/InputNumber';
import { getProgressRate, getTypeString, getProgressString } from '../../helpers/calculation-plan';
import { toDefaultDateString } from '../../helpers/date';

// A string variable for theme. If this is 'undefined', theme uses to default theme.
let themeName = undefined;
let styles = require('./styles').default(theme, themeName); // get styles depend on theme.

function PlanDetail(props) {
  const [isLoading, load] = useState(true);
  const [plan, setPlan] = useState(null);
  const [progressCount, setProgressCount] = useState(0);
  const [progressTime, setProgressTime] = useState({ hours: 0, minutes: 0 });

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

  const viewPlanHistoryHandler = () => {
    props.navigation.navigate('PlanHistoryDetail', { planId: plan.id });
  };

  return (
    <ScrollView style={{ backgroundColor: theme(themeName).background }}>
      <View style={styles.container}>
        <View style={styles.centerView}>
          <Text style={styles.planTitle}>{plan.title}</Text>
        </View>
        <Divider style={styles.marginTopBottom} />
        <View style={styles.horizontalView}>
          <Text style={styles.groupLabel}>{t('PLAN_START_DATE')}: </Text>
          <Text style={styles.groupLabel}>{toDefaultDateString(plan.startingDate)}</Text>
        </View>
        <View style={styles.horizontalView}>
          <Text style={styles.groupLabel}>{t('PLAN_TYPES')}: </Text>
          <Text style={styles.groupLabel}>
            {getTypeString(t, plan.type)}
          </Text>
        </View>
        {
          /* If an unit of the plan is 'once', It doesn't render */
          plan.unit !== 'once'
            ?
            <>
              <View style={styles.horizontalView}>
                <Text style={styles.groupLabel}>{t('CURRENT_PROGRESS')}: </Text>
                <Text style={styles.groupLabel}>
                  {`${getProgressString(t, plan.unit, plan.progress)} / ${getProgressRate(plan.progress, plan.goal)}%`}
                </Text>
              </View>
              <View style={styles.horizontalView}>
                <Text style={styles.groupLabel}>{t('GOAL')}: </Text>
                <Text style={styles.groupLabel}>
                  {getProgressString(t, plan.unit, plan.goal)}
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
                      color={theme(themeName).main}
                      onChangeText={(v) => setProgressTime({ ...progressTime, hours: v })}
                    />
                    <Text style={{ color: theme(themeName).main }}> {t('HOURS')} </Text>
                    <InputNumber
                      notAllowNegative
                      value={progressTime.minutes.toString()}
                      color={theme(themeName).main}
                      onChangeText={(v) => setProgressTime({ ...progressTime, minutes: v })}
                    />
                    <Text style={{ color: theme(themeName).main }}> {t('MINUTES')} </Text>
                  </>
                )
                : null
          }
        </View>
        <Divider style={styles.marginTopBottom} />
        <View>
          <Button
            title={t('APPLY_PROGRESS')}
            buttonStyle={styles.applyProgressButton}
            onPress={addProgressPlanHandler}
          />
          <Button
            title={t('VIEW_PLAN_HISTORY')}
            buttonStyle={styles.historyButton}
            onPress={viewPlanHistoryHandler}
          />
          <Button
            title={t('END_PLAN')}
            buttonStyle={styles.endPlanButton}
            onPress={endPlanHandler}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default PlanDetail;