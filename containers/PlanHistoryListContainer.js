import PlanHistoryList from '../components/PlanHistoryListComponent';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  settings: state.settings,
  plans: state.plans
});

export default connect(mapStateToProps)(PlanHistoryList);