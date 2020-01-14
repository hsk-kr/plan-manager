import { connect } from 'react-redux';
import PlanHistory from '../components/PlanHistoryComponent';

const mapStateToProps = (state) => ({
  settings: state.settings
});

export default connect(mapStateToProps)(PlanHistory);