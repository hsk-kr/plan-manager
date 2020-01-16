import { connect } from 'react-redux';
import PlanList from '../components/PlanListComponent';
import {
  addPlan,
  deletePlan,
  progressPlan,
  resetPlans,
  completePlan,
  endPlan,
  plansUpToDate,
} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
  plans: state.plans,
  settings: state.settings
});

const mapDispatchToProps = (dispatch) => ({
  addPlan: ({ type, unit, goal, title }) => dispatch(addPlan({ type, unit, goal, title })),
  deletePlan: (id) => dispatch(deletePlan(id)),
  progressPlan: ({ id, progress }) => dispatch(progressPlan({ id, progress })),
  resetPlans: () => dispatch(resetPlans()),
  completePlan: (id) => dispatch(completePlan(id)),
  endPlan: (id) => dispatch(endPlan(id)),
  plansUpToDate: () => dispatch(plansUpToDate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanList);