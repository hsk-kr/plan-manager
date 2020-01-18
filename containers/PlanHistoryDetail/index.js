import PlanHistoryDetail from './PlanHistoryDetail';
import { connect } from 'react-redux';
import { deletePlan, deleteHistory } from '../../redux/ActionCreators';

const mapStateToProps = (state) => ({
  settings: state.settings,
  plans: state.plans
});

const mapDispatchToProps = (dispatch) => ({
  deletePlan: (id) => dispatch(deletePlan(id)),
  deleteHistory: (planId, historyId) => dispatch(deleteHistory(planId, historyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanHistoryDetail);