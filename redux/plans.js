import {
  ADD_PLAN,
  DELETE_PLAN,
  ADD_PROGRESS_PLAN,
  END_PLAN,
  COMPLETE_PLAN,
  RESET_PLANS,
} from './ActionTypes';
import uuid from 'react-native-uuid';

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
        delete state.history[plan.id]; // delete history by plan.id

        return {
          ...state,
          plans: state.plans.filter((plan) => plan.id !== action.payload),
          history: { ...state.history }
        };
      }
    case ADD_PROGRESS_PLAN:
      {
        const { id, progress } = action.payload;
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
    case RESET_PLANS:
      return {
        plans: [],
        history: {},
      };
    default:
      return state;
  }
};

export default plans;