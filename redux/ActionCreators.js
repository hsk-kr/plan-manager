import {
  CHANGE_LANGUAGE,
  CHANGE_THEME,
  ADD_PLAN,
  DELETE_PLAN,
  ADD_PROGRESS_PLAN,
  END_PLAN,
  COMPLETE_PLAN,
  RESET_PLANS,
  PLANS_UP_TO_DATE,
  DELETE_HISTORY,
  RESTORE_PLANS,
} from './ActionTypes';

// settings
export const changeLanguage = (lang) => ({
  type: CHANGE_LANGUAGE,
  payload: lang
});

export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: theme
});

// plans

/**
 * Add Plan
 * @param {object} param { type, unit, goal, title }
 */
export const addPlan = ({ type, unit, goal, title }) => ({
  type: ADD_PLAN,
  payload: { type, unit, goal, title }
});

export const deletePlan = (id) => ({
  type: DELETE_PLAN,
  payload: id
});

export const endPlan = (id) => ({
  type: END_PLAN,
  payload: id
});

export const completePlan = (id) => ({
  type: COMPLETE_PLAN,
  payload: id
});

export const resetPlans = () => ({
  type: RESET_PLANS
});

export const plansUpToDate = () => ({
  type: PLANS_UP_TO_DATE
});

export const deleteHistory = (planId, historyId) => ({
  type: DELETE_HISTORY,
  payload: { planId, historyId }
});

export const restorePlans = (plans, history) => ({
  type: RESTORE_PLANS,
  payload: { plans, history }
});

/**
 * Progress Plan
 * @param {object} param { id, progress }
 */
export const addProgressPlan = ({ id, progress }) => ({
  type: ADD_PROGRESS_PLAN,
  payload: { id, progress }
});