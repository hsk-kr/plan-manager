import {
  CHANGE_LANGUAGE,
  CHANGE_THEME,
  ADD_PLAN,
  DELETE_PLAN,
  ADD_PROGRESS_PLAN,
  END_PLAN,
  COMPLETE_PLAN,
  RESET_PLANS,
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

/**
 * Progress Plan
 * @param {object} param { id, progress }
 */
export const progressPlan = ({ id, progress }) => ({
  type: ADD_PROGRESS_PLAN,
  payload: { id, progress }
});