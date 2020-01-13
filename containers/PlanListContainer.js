import { connect } from 'react-redux';
import PlanList from '../components/PlanListComponent';

const mapStateToProps = (state) => ({
  settings: state.settings
});

export default connect(mapStateToProps)(PlanList);