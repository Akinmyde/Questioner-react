import { connect } from 'react-redux';
import { signup } from '../../actions/auth.actions';
import Signup from '../presentations/Signup/Signup';

const mapStateToProps = ({auth, LoadingReducer}) => ({auth, LoadingReducer})

const SignupContainer = connect(mapStateToProps, { signup })(Signup)

export default SignupContainer;
