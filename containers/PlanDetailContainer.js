import { connect } from 'react-redux';
import PlanDetail from '../components/PlanDetailComponent';

const mapStateToProps = (state) => ({
  settings: state.settings,
  plans: state.plans
});

export default connect(mapStateToProps)(PlanDetail);