import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight,
  Modal,
  Animated
} from 'react-native';
import {
  Divider,
  Icon,
  Button,
  ButtonGroup,
  Input
} from 'react-native-elements';
import { plans } from '../data/plans';
import { getProgressRate, getColorOfPlan } from '../utils/calculation-plan';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import locale from '../localization/locale';
import theme from '../theme';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import InputNumber from './InputNumberComponent';

// A string variable for theme. If this is 'undefined', theme uses to default theme.
let themeName = undefined;

/**
 * A Component for a list item of the plan list.
 */
function PlanListItem({ list, type, handleClickListItem, t }) {

  return list.map((item) => {
    const refSwipeableButton = useRef(null);

    if (item.type !== type) {
      return null;
    }

    const backgroundColor = {
      backgroundColor: getColorOfPlan(themeName, item.progress, item.goal)
    };

    const closeSwipe = () => {
      refSwipeableButton.current.close();
    }

    const renderLeftActions = () => {
      return (
        <RectButton onPress={closeSwipe} style={[styles.actionButton, styles.leftActionButton]}>
          <Icon
            type='font-awesome'
            name='check'
            color='white'
            size={24}
          />
        </RectButton>
      )
    };

    const renderRightActions = () => {
      return (
        <RectButton onPress={closeSwipe} style={[styles.actionButton, styles.rightActionButton]}>
          <Icon
            type='font-awesome'
            name='trash'
            color='white'
            size={24}
          />
        </RectButton>
      )
    };

    return (
      <Swipeable
        key={item.id}
        ref={refSwipeableButton}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}>
        <TouchableHighlight
          onPress={() => handleClickListItem(item.id)}
          underlayColor={theme(themeName).underlayColor}
        >
          <View style={[styles.listItemContainer, backgroundColor]}>
            <View style={styles.listItemLeft}>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <View>
                <Text style={styles.listItemProgressText}>진행률 {getProgressRate(item.progress, item.goal)}%</Text>
              </View>
            </View>
            <View style={styles.listItemRight}>
              <Icon type='font-awesome' name='chevron-right' color={theme(themeName).listItemFontColor} size={20} />
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    )
  });
}

function PlanListComponent(props) {
  // states
  const [isLoading, load] = useState(true);
  const [planList, setPlanList] = useState(plans);
  const [planTypeIndex, setPlanTypeIndex] = useState(0);
  const [planAchievementIndex, setPlanAchievementIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [planTitle, setPlanTitle] = useState('');
  const [countForPlan, setCountForPlan] = useState('');
  const [timeForPlan, setTimeForPlan] = useState({ hours: 0, minutes: 0 });

  // translate function for language
  const t = locale(props.settings.language);

  // when component's mounted, change isLoading is true
  useEffect(() => {
    load(false);
  }, []);

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

  // custom functions
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigateToDetail = (planId) => {
    props.navigation.navigate('PlanDetail', { planId });
  };

  const content = (
    <>
      <ScrollView>
        <Animatable.View animation='bounceIn' duration={2000} delay={1000}>
          <View style={styles.container} >
            <View>
              <Text style={styles.groupHeader}>{t('DAILY_PLAN')}</Text>
              <PlanListItem list={planList} type='daily' handleClickListItem={navigateToDetail} t={t} />
            </View>
            <Divider style={styles.divider} />
            <View>
              <Text style={styles.groupHeader}>{t('WEEKLY_PLAN')}</Text>
              <PlanListItem list={planList} type='weekly' handleClickListItem={navigateToDetail} t={t} />
            </View>
            <Divider style={styles.divider} />
            <View>
              <Text style={styles.groupHeader}>{t('MONTHLY_PLAN')}</Text>
              <PlanListItem list={planList} type='monthly' handleClickListItem={navigateToDetail} t={t} />
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
      {/* ------------------------------ */}
      {/* -- Add plan modal START -- */}
      {/* ------------------------------ */}
      <Modal
        animationType='slide'
        transparent={false}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <ScrollView style={styles.addPlanContainer}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.groupTitle, { fontWeight: 'bold', fontSize: 18 }]}>{t('ADD_PLAN_MODAL_TITLE')}</Text>
          </View>
          <View>
            <Input
              value={planTitle}
              onChangeText={(text) => setPlanTitle(text)}
              placeholder={t('PLAN_TITLE')}
            />
          </View>
          <Divider style={styles.dividerMargin} />
          <View>
            <Text style={styles.groupTitle}>{t('PLAN_TYPES')}</Text>
            <Text style={styles.explanation}>{t('PLAN_TYPES_EXPLANATION')}</Text>
            <ButtonGroup
              onPress={(selectedIndex) => setPlanTypeIndex(selectedIndex)}
              selectedIndex={planTypeIndex}
              textStyle={styles.groupButtonText}
              selectedButtonStyle={styles.selectedGroupButton}
              containerStyle={styles.groupButton}
              buttons={
                [
                  t('PLAN_TYPES_DAILY'),
                  t('PLAN_TYPES_WEEKLY'),
                  t('PLAN_TYPES_MONTHLY')
                ]
              }
            />
          </View>
          <Divider style={styles.dividerMargin} />
          <View>
            <Text style={styles.groupTitle}>{t('PLAN_ACHIEVEMENT_TYPES')}</Text>
            <Text style={styles.explanation}>{t('PLAN_ACHIEVEMENT_TYPES_EXPLANATION')}</Text>
            <ButtonGroup
              onPress={(selectedIndex) => setPlanAchievementIndex(selectedIndex)}
              selectedIndex={planAchievementIndex}
              textStyle={styles.groupButtonText}
              selectedButtonStyle={styles.selectedGroupButton}
              containerStyle={styles.groupButton}
              buttons={
                [
                  t('PLAN_ACHIEVEMENT_TYPES_COUNT'),
                  t('PLAN_ACHIEVEMENT_TYPES_TIME'),
                  t('PLAN_ACHIEVEMENT_TYPES_ONCE')
                ]
              }
            />
          </View>
          <View>
            {
              planAchievementIndex === 0
                ? /* planAchievementIndex === 0 */(
                  <Input
                    textAlign='center'
                    value={countForPlan}
                    onChangeText={(text) => setCountForPlan(text)}
                    placeholder={t('PLAN_ACHIEVEMENT_TYPES_COUNT')}
                  />
                )
                : planAchievementIndex === 1
                  ? /* planAchievementIndex === 1 */(
                    <>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <InputNumber
                          notAllowNegative
                          onChangeText={(v) => setTimeForPlan({ ...timeForPlan, hours: v })}
                          value={timeForPlan.hours} />
                        <Text style={styles.timeLabel}>{t('HOURS_TEXT')}</Text>
                        <InputNumber
                          notAllowNegative
                          onChangeText={(v) => setTimeForPlan({ ...timeForPlan, minutes: v })}
                          value={timeForPlan.minutes} />
                        <Text>{t('MINUTES_TEXT')}</Text>
                      </View>
                    </>
                  )
                  : /* planAchievementIndex === 2 or others */(
                    null
                  )
            }
          </View>
          <Divider style={styles.dividerMargin} />
          <View>
            <Text style={styles.explanation}>{t('ADD_PLAN_EXPLANATION')}</Text>
            <Button
              title={t('ADD_PLAN_BUTTON')}
              buttonStyle={styles.addPlanButton}
              textStyle={styles.addPlanButtonText}
            />
            <Button
              title={t('CANCEL')}
              buttonStyle={styles.cancelButton}
              textStyle={styles.addPlanButtonText}
              onPress={toggleModal}
            />
          </View>
        </ScrollView>
      </Modal>
      {/* ------------------------------ */}
      {/* -- Add plan modal END -- */}
      {/* ------------------------------ */}
      {/* ------------------------------ */}
      {/* -- Add plan button START -- */}
      {/* ------------------------------ */}
      <Icon
        type='font-awesome'
        name='plus'
        color={theme(themeName).listItemBackground}
        containerStyle={styles.addButton}
        onPress={toggleModal}
        reverse
        raised
      />
      {/* ------------------------------ */}
      {/* -- Add plan button END -- */}
      {/* ------------------------------ */}
    </>
  );

  if (isLoading) {
    return <Loading />
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme(themeName).background
  },
  groupHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme(themeName).groupHeader,
    marginBottom: 10,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: theme(themeName).divider
  },
  listItemContainer: {
    flex: 1,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    flexDirection: 'row'
  },
  listItemLeft: {
    flex: 4
  },
  listItemRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItemTitle: {
    color: theme(themeName).listItemFontColor,
    fontSize: 14
  },
  listItemProgressText: {
    color: theme(themeName).listItemProgressFontColor,
    fontSize: 12
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 999,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  addPlanButton: {
    marginTop: 15,
    backgroundColor: theme(themeName).listItemBackground
  },
  addPlanButtonText: {
    color: theme(themeName).listItemFontColor,
  },
  cancelButton: {
    marginTop: 15,
    backgroundColor: '#ff3f34',
  },
  addPlanContainer: {
    margin: 30
  },
  explanation: {
    color: '#808e9b',
    fontSize: 12,
    margin: 10,
  },
  groupTitle: {
    color: theme(themeName).main,
    fontSize: 16
  },
  groupButton: {
    backgroundColor: theme(themeName).listItemFontColor
  },
  selectedGroupButton: {
    backgroundColor: theme(themeName).listItemBackground
  },
  groupButtonText: {
    color: theme(themeName).listItemBackground
  },
  dividerMargin: {
    marginTop: 15,
    marginBottom: 15,
  },
  timeLabel: {
    marginRight: 10
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  leftActionButton: {
    backgroundColor: '#05c46b'
  },
  rightActionButton: {
    backgroundColor: '#ff3f34'
  }
});

export default PlanListComponent;