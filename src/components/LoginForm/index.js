/**
 * @author oguhpereira
 * User login form
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActions from '../../store/actions/auth';
import LoginForm from './LoginFormAPI';

const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
