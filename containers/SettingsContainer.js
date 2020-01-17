import { connect } from 'react-redux';
import Settings from '../components/SettingsComponent';
import {
  changeLanguage,
  changeTheme,
  restorePlans,
} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
  settings: state.settings,
  plans: state.plans
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (lang) => dispatch(changeLanguage(lang)),
  changeTheme: (theme) => dispatch(changeTheme(theme)),
  restorePlans: (plans, history) => dispatch(restorePlans(plans, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);