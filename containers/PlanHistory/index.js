import { connect } from 'react-redux';
import PlanHistory from './PlanHistory';

const mapStateToProps = (state) => ({
  settings: state.settings,
  plans: state.plans
});

export default connect(mapStateToProps)(PlanHistory);