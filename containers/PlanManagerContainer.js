import { connect } from 'react-redux';
import PlanManager from '../components/PlanManagerComponent';

const mapStateToProps = (state) => ({
  settings: state.settings
});

export default connect(mapStateToProps)(PlanManager);