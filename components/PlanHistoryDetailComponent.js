import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Alert
} from 'react-native';
import locale from '../localization/locale';
import theme from '../theme';
import Loading from './LoadingComponent';
import PieChart from 'react-native-pie-chart';
import {
  getTypeString,
  getUnitString,
  getProgressString,
  getColorOfPlan
} from '../utils/calculation-plan';
import { toDefaultDateString } from '../utils/date';
import { Divider, Button, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

// A string variable for theme. If this is 'undefined', theme uses to default theme.
let themeName = undefined;

/**
 * Create a history list with plans and history.
 * @param {Array} plan plan
 * @param {Array} history history
 */
const createHistoryList = (plan, planHistory) => {
  return new Promise((resolve, reject) => {
    // generate since endingDate
    const createLatestPeriod = (startingDate, endingDate, type) => {
      const period = { startingDate: null, endingDate: null };
      const tmpdate = new Date(endingDate || Date.now());
      tmpdate.setHours(0, 0, 0);

      if (type === 'daily') {
        period.startingDate = new Date(tmpdate);

        tmpdate.setHours(23, 59, 59);
        period.endingDate = new Date(tmpdate);
      } else if (type === 'weekly') {
        const daySubtractWeight = [6, 0, 1, 2, 3, 4, 5];

        tmpdate.setDate(tmpdate.getDate() - daySubtractWeight[tmpdate.getDay()]);
        period.startingDate = new Date(tmpdate);

        tmpdate.setDate(tmpdate.getDate() + 6);
        tmpdate.setHours(23, 59, 59);
        period.endingDate = new Date(tmpdate);
      } else if (type === 'monthly') {
        tmpdate.setDate(1);
        period.startingDate = new Date(tmpdate);

        tmpdate.setMonth(tmpdate.getMonth() + 1);
        tmpdate.setDate(tmpdate.getDate() - 1);
        period.endingDate = new Date(tmpdate);
      }

      if (period.startingDate.getTime() < startingDate.getTime()) {
        period.startingDate = startingDate;
      }

      return period;
    }

    // doesn't generate over startingDate
    function generatePreviousPeriod(startingDate, type) {
      return () => {
        if (!this.startingDate || !this.endingDate) {
          return;
        }

        if (type === 'daily') {
          this.startingDate.setDate(this.startingDate.getDate() - 1);
          this.endingDate.setDate(this.endingDate.getDate() - 1);
        } else if (type === 'weekly') {
          this.startingDate.setDate(this.startingDate.getDate() - 7);
          this.endingDate.setDate(this.endingDate.getDate() - 7);
        } else if (type === 'monthly') {
          this.startingDate.setMonth(this.startingDate.getMonth() - 1);
          this.endingDate.setDate(1);
          this.endingDate.setDate(this.endingDate.getDate() - 1);
        }

        if (this.endingDate.getTime() < startingDate.getTime()) {
          this.startingDate = null;
          this.endingDate = null;
          this.hasDone = true;
        } else if (this.startingDate.getTime() < startingDate.getTime()) {
          this.startingDate = new Date(startingDate);
        }
      };
    }

    const isDateInBetweenPeriod = (date, period) => (
      date.getTime() >= period.startingDate.getTime() && date.getTime() <= period.endingDate.getTime()
    );

    const createHistory = (period) => ({
      startingDate: new Date(period.startingDate),
      endingDate: new Date(period.endingDate),
      totalProgress: 0,
      list: []
    });

    /**
     * historyList
     * type - title
     * {
     *  titled,
     *  startingDate,
     *  endingDate
     * }
     * type - plan
     * {
     *  history
     * }
     */
    const historyList = [];

    const { type } = plan;
    let period = createLatestPeriod(new Date(plan.startingDate), plan.endingDate !== undefined ? new Date(plan.endingDate) : null, type);
    period.generatePreviousPeriod = generatePreviousPeriod.bind(period)(new Date(plan.startingDate), type);

    let totalProgress = 0;
    let cntDone = 0;
    let cntOverDone = 0;
    let cntNotDone = 0;
    let cntProgress = 0;

    let history = createHistory(period);
    historyList.push(history);

    const countProgress = () => {
      if (history.totalProgress <= 0 || history.list.length === 0) {
        cntNotDone += 1;
      } else if (history.totalProgress < plan.goal) {
        cntProgress += 1;
      } else if (history.totalProgress === plan.goal) {
        cntDone += 1;
      } else {
        cntOverDone += 1;
      }
    };

    for (let i = planHistory.length - 1; i >= 0; i--) {
      if (isDateInBetweenPeriod(new Date(planHistory[i].regDate), period)) {
        history.list.push({ ...planHistory[i] });
        history.totalProgress += planHistory[i].progress;
        totalProgress += planHistory[i].progress;
      } else {
        countProgress();
        period.generatePreviousPeriod();

        if (period.hasDone) {
          break;
        }

        history = createHistory(period);
        historyList.push(history);

        i++; // Iterate this step again
      }
    }
    countProgress(); // last step isn't recorded so after looping, It records.

    resolve({
      totalProgress,
      cntDone,
      cntOverDone,
      cntNotDone,
      cntProgress,
      historyList
    });
  });
};

function PlanHistoryList(props) {
  const [isLoading, load] = useState(true);
  const [plan, setPlan] = useState(null);
  const [cntObj, setCntObj] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const pageStep = 5; // how many load at a once time.
  const planId = props.navigation.getParam('planId', 0);

  // translate function for language
  const t = locale(props.settings.language);

  // change themeName when theme's changed
  useEffect(() => {
    themeName = props.settings.theme;

    props.navigation.setParams({
      headerBackgroundColor: theme(themeName).background
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
          <Text style={styles.planInfoText}>{`${t('GOAL_TEXT')}: ${getProgressString(t, plan.unit, plan.goal)}`}</Text>
          <Text style={styles.planInfoText}>{`${t('PLAN_START_DATE_TEXT')}: ${toDefaultDateString(plan.startingDate, true)}`}</Text>
          {
            plan.endingDate
              ? <Text style={styles.planInfoText}>{`${t('PLAN_END_DATE_TEXT')}: ${toDefaultDateString(plan.endingDate, true)}`}</Text>
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
                color={theme(themeName).main}
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

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: theme(themeName).background
  },
  viewMoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    margin: 30
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  planInfoText: {
    color: theme(themeName).main,
    fontSize: 13
  },
  divider: {
    marginTop: 5,
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    color: theme(themeName).main,
    marginBottom: 20
  },
  activity: {
    fontSize: 16,
    color: theme(themeName).main,
    marginBottom: 5
  },
  activityDate: {
    color: theme(themeName).main,
    fontSize: 14,
  },
  activityText: {
    color: theme(themeName).main,
    fontSize: 13
  },
  activityContainer: {
    marginBottom: 10
  },
  deletePlanButton: {
    marginBottom: 10
  }
});

export default PlanHistoryList;

