import {
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
import uuid from 'react-native-uuid';
import { isOverDate } from '../helpers/calculation-plan';

const createUniqueId = () => uuid.v1().replace(/-/gi, ''); // don't use hyphen in id.

const createHistory = (id, progress) => {
  return { id, progress, regDate: new Date(Date.now()) };
};

const plans = (
  state = {
    plans: [],
    history: {}
  },
  action
) => {
  switch (action.type) {
    case ADD_PLAN:
      {
        const { title, type, unit, goal } = action.payload;
        const id = createUniqueId();
        const newPlan = {
          id,
          title,
          type,
          unit,
          goal,
          progress: 0,
          hasDone: false,
          startingDate: new Date(Date.now())
        };

        // create new history by id
        return {
          ...state,
          plans: [...state.plans, newPlan],
          history: { ...state.history, [id]: [] }
        };
      }
    case END_PLAN:
      return {
        ...state,
        plans: state.plans.map((v) => {
          if (v.id === action.payload) {
            return {
              ...v,
              endingDate: new Date(Date.now())
            };
          }

          return v;
        })
      };
    case DELETE_PLAN:
      {
        delete state.history[action.payload]; // delete history by action.payload(will be deleted planId)

        return {
          ...state,
          plans: state.plans.filter((plan) => plan.id !== action.payload),
          history: { ...state.history }
        };
      }
    case ADD_PROGRESS_PLAN:
      {
        const id = action.payload.id;
        const progress = Number(action.payload.progress);
        const targetPlan = state.plans.filter((plan) => plan.id === id)[0];

        if (targetPlan) {
          targetPlan.progress += progress;
          if (targetPlan.progress >= targetPlan.goal) {
            targetPlan.hasDone = true;
          }
        }

        return {
          ...state,
          plans: state.plans.map((v, i) => {
            if (v.id === id) {
              return targetPlan;
            }

            return v;
          }),
          history: {
            ...state.history,
            [id]: [
              ...state.history[id],
              createHistory(createUniqueId(), progress)
            ]
          }
        };
      }
    case COMPLETE_PLAN:
      {
        const plan = state.plans.filter((v) => v.id === action.payload)[0];
        const progress = plan.progress < plan.goal ? plan.goal - plan.progress : 0;

        if (progress > 0) {
          return {
            ...state,
            plans: state.plans.map((v) => {
              if (v.id === action.payload) {
                return { ...v, progress: v.progress + progress };
              }

              return v;
            }),
            history: {
              ...state.history,
              [action.payload]: [
                ...state.history[action.payload],
                createHistory(createUniqueId(), progress)
              ]
            }
          };
        }

        return {
          ...state
        };
      }
    case END_PLAN:
      return {
        ...state,
        plans: state.plans.map((v) => {
          if (v.id === action.payload) {
            return {
              ...v,
              endingDate: new Date(Date.now())
            }
          }

          return v;
        })
      };
    case PLANS_UP_TO_DATE:
      {
        const upToDatePlans = state.plans.map((v) => {
          // if there is a history
          if (!v.endingDate && state.history[v.id].length > 0) {
            // retrieve newest one from the history.
            const newestHistory = state.history[v.id][state.history[v.id].length - 1];

            // If newest history is old one
            if (isOverDate(v.type, new Date(newestHistory.regDate))) {
              // reset progress
              return { ...v, progress: 0 };
            }
          }

          return v;
        });

        return {
          ...state,
          plans: upToDatePlans
        };
      }
    case RESET_PLANS:
      return {
        plans: [],
        history: {},
      };
    case DELETE_HISTORY:
      return {
        ...state,
        history: {
          ...state.history,
          [action.payload.planId]: state.history[action.payload.planId].filter((v) => v.id !== action.payload.historyId)
        }
      };
    case RESTORE_PLANS:
      return {
        ...state,
        plans: [...action.payload.plans],
        history: { ...action.payload.history }
      };
    default:
      return state;
  }
};

export default plans;