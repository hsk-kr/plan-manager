import { connect } from 'react-redux';
import PlanHistory from '../components/PlanHistoryComponent';

const mapStateToProps = (state) => ({
  settings: state.settings,
  plans: state.plans
});

export default connect(mapStateToProps)(PlanHistory);