import { connect } from 'react-redux';
import PlanDetail from '../components/PlanDetailComponent';
import { endPlan, addProgressPlan } from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
  settings: state.settings,
  plans: state.plans,
});

const mapDispatchToProps = (dispatch) => ({
  addProgressPlan: ({ id, progress }) => dispatch(addProgressPlan({ id, progress })),
  endPlan: (id) => dispatch(endPlan(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanDetail);