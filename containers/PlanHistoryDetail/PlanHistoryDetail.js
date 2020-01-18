import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { Divider, Button, Icon } from 'react-native-elements';
import locale from '../../localization/locale';
import theme from '../../theme';
import Loading from '../../components/Loading';
import PieChart from 'react-native-pie-chart';
import { getTypeString, getUnitString, getProgressString } from '../../helpers/calculation-plan';
import { toDefaultDateString } from '../../helpers/date';
import { TouchableOpacity } from 'react-native-gesture-handler';
import createHistoryList from './createHistoryList';

// A string variable for theme. If this is 'undefined', theme uses to default theme.
let themeName = undefined;
let styles = require('./styles').default(theme, themeName); // get styles depend on theme.

function PlanHistoryDetail(props) {
  // states
  const [isLoading, load] = useState(true);
  const [plan, setPlan] = useState(null);
  const [cntObj, setCntObj] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  // variables 
  const pageStep = 5; // how many load at a once time.
  const planId = props.navigation.getParam('planId', 0);

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

  // when there is a change in history, update data
  useEffect(() => {
    const plan = props.plans.plans.filter((v) => v.id === planId)[0];
    if (!plan) {
      props.navigation.goBack();
      return;
    }

    setPlan(plan);
    const history = props.plans.history[planId];

    load(true);
    createHistoryList(plan, history)
      .then(({
        totalProgress,
        cntDone,
        cntOverDone,
        cntNotDone,
        cntProgress,
        historyList
      }) => {
        load(false);

        setCntObj({
          totalProgress,
          cntDone,
          cntOverDone,
          cntNotDone,
          cntProgress
        });
        setHistoryList(historyList);
      });
  }, [props.plans.history[planId]])

  // event handlers
  const deletePlanHandler = (planId) => {
    Alert.alert(
      t('ALERT_DELETE_PLAN_TITLE'),
      t('ALERT_DELETE_PLAN_QUESTION'),
      [
        {
          text: t('CANCEL'),
          style: 'cancel'
        },
        {
          text: t('OK'),
          onPress: () => {
            props.deletePlan(planId);
            props.navigation.goBack();
          }
        }
      ],
      { cancelable: false }
    );
  };

  const deletePlanHistoryHandler = (planId, history) => {
    Alert.alert(
      t('ALERT_DELETE_HISTORY_TITLE'),
      `${t('ALERT_DELETE_HISTORY_QUESTION')}\n${history.progress} / ${toDefaultDateString(history.regDate)}`,
      [
        {
          text: t('CANCEL'),
          style: 'cancel'
        },
        {
          text: t('OK'),
          onPress: () => {
            props.deleteHistory(planId, history.id);
          }
        }
      ],
      { cancelable: false }
    );
  };

  // if data hasn't been loaded, show loading indicator
  if (
    isLoading
    || !plan
    || !cntObj
    || !historyList
  ) {
    return <Loading />
  }

  const chartSize = 250;
  const { cntNotDone, cntProgress, cntDone, cntOverDone } = cntObj;
  const cntList = [cntNotDone, cntProgress, cntDone, cntOverDone];
  const chartColorList = [
    theme(themeName).notDoneBackground,
    theme(themeName).progressingBackground,
    theme(themeName).doneBackground,
    theme(themeName).overDoneBackground,
  ];

  // remove zero data.
  for (let i = 0; i < 4; i++) {
    if (cntList[cntList.length - 1] <= 0) {
      cntList.pop();
      chartColorList.pop();
    }
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <Text style={styles.title}>{plan.title}</Text>
          <PieChart
            chart_wh={chartSize}
            series={cntList}
            sliceColor={chartColorList}
          />
        </View>
        <View>
          <Button
            title={t('DELETE_PLAN')}
            containerStyle={styles.deletePlanButton}
            onPress={() => deletePlanHandler(plan.id)} />
          <Text style={styles.planInfoText}>{`${t('PLAN_TYPES')}: ${getTypeString(t, plan.type)}`}</Text>
          <Text style={styles.planInfoText}>{`${t('PLAN_ACHIEVEMENT_TYPES')}: ${getUnitString(t, plan.unit)}`}</Text>
          <Text style={styles.planInfoText}>{`${t('GOAL')}: ${getProgressString(t, plan.unit, plan.goal)}`}</Text>
          <Text style={styles.planInfoText}>{`${t('PLAN_START_DATE')}: ${toDefaultDateString(plan.startingDate, true)}`}</Text>
          {
            plan.endingDate
              ? <Text style={styles.planInfoText}>{`${t('PLAN_END_DATE')}: ${toDefaultDateString(plan.endingDate, true)}`}</Text>
              : null
          }
          <Divider style={styles.divider} />
          <Text style={styles.planInfoText}>{`${t('TOTAL_PROGRESS')}: ${getProgressString(t, plan.unit, cntObj.totalProgress)}`}</Text>
          <Text style={styles.planInfoText}>{`${t('PLAN_NOT_DONE')}: ${cntNotDone} ${t('COUNT_SUFFIX')}`}</Text>
          <Text style={styles.planInfoText}>{`${t('PLAN_PROGRESSING')}: ${cntProgress} ${t('COUNT_SUFFIX')}`}</Text>
          <Text style={styles.planInfoText}>{`${t('PLAN_DONE')}: ${cntDone} ${t('COUNT_SUFFIX')}`}</Text>
          <Text style={styles.planInfoText}>{`${t('PLAN_OVER_DONE')}: ${cntOverDone} ${t('COUNT_SUFFIX')}`}</Text>
          <Divider style={styles.divider} />
        </View>
        <View>
          <Text style={styles.activity}>{t('ACTIVITIES')}</Text>
          <View>
            {historyList.map((v, i) => {
              if (i >= pageCount) {
                return null;
              }

              return (
                <View
                  key={i}
                  style={styles.activityContainer}>
                  <Text style={styles.activityDate}>{toDefaultDateString(v.startingDate, false)} ~ {toDefaultDateString(v.endingDate, false)}</Text>
                  <Text />
                  <View>
                    {
                      v.list.map((activity) => (
                        <TouchableOpacity
                          key={activity.id}
                          onPress={() => deletePlanHistoryHandler(plan.id, activity)}>
                          <View>
                            <Text style={styles.activityText}>{`${getProgressString(t, plan.unit, activity.progress)} / ${toDefaultDateString(activity.regDate)}`}</Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    }
                  </View>
                  <Divider style={styles.divider} />
                </View>
              );
            })}
          </View>
          <View style={styles.viewMoreContainer}>
            <TouchableOpacity
              onPress={
                () => {
                  setPageCount(pageCount + pageStep);
                }
              }>
              <Icon
                name='chevron-circle-down'
                type='font-awesome'
                color={theme(themeName).groupHeader}
                size={16}
                reverse
                raised />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default PlanHistoryDetail;

