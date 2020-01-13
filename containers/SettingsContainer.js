import { connect } from 'react-redux';
import Settings from '../components/SettingsComponent';
import {
  changeLanguage,
  changeTheme
} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
  settings: state.settings
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (lang) => dispatch(changeLanguage(lang)),
  changeTheme: (theme) => dispatch(changeTheme(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);