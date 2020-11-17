import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { logIn } from '../../Redux/authReducer';
import { requiredField } from '../../utils/validators/validators';
import { CreateField } from '../common/FormsControls/FormsControls';
import style from '../common/FormsControls/FormsControls.module.css'


class LoginContainer extends React.Component {
    onSubmit = (formData) => {
        this.props.logIn(formData.login, formData.password, formData.rememberMe, formData.captcha);
    }
    render() {
        return (<>
            {
                this.props.isAuth ?
                    <Redirect to='/profile' /> :
                    <div>
                        <h1>Loging page</h1>
                        <LoginReduxForm onSubmit={this.onSubmit} captchaUrl={this.props.captchaUrl} />
                    </div>
            }
        </>
        )
    }

}
const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form action="" onSubmit={handleSubmit} >
            {CreateField("text", "login", "login", [requiredField])}
            {CreateField("password", "password", "password", [requiredField])}
            {CreateField("checkbox", null, "rememberMe", [], 'input', "rememberMe")}

            {captchaUrl && <img src={captchaUrl} alt="captcha Image" className={style.captchaImage} />}
            {captchaUrl && CreateField("text", "captcha", "captcha", [requiredField])}
            <div>
                {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
            </div>

            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

const mapStateToProps = (state) => {
    return ({
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captcha
    })
}


export default connect(mapStateToProps, { logIn })(LoginContainer);