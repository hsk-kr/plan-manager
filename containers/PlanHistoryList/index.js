import PlanHistoryList from './PlanHistoryList';
import { connect } from 'react-redux';

export { ENDED_PLANS, CURRENT_PLANS } from './PlanHistoryList';

const mapStateToProps = (state) => ({
  settings: state.settings,
  plans: state.plans
});

export default connect(mapStateToProps)(PlanHistoryList);