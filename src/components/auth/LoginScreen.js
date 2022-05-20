import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { startLoginEmailPassword, startLoginGoogle } from '../actions/auth'
export const LoginScreen = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);
    const [formValues, handlerInputChanger] = useForm({
        email: 'marioeduardoalarcon@gmail.com',
        password: '123456'
    })
    const { email, password } = formValues;
    const handeLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password))
    }
    const haceGoogleLogin = () => {
        dispatch(startLoginGoogle());
    }
    return (
        <>
            <h3 className="auth__title ">Login</h3>
            <form onSubmit={handeLogin}className="animate__animated animate__bounceIn">
                <input type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handlerInputChanger}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handlerInputChanger}
                />
                <button
                    className="btn btn-primary btn-blick"
                    type='submit'
                    disabled={loading}
                >Login</button>

                <div className="auth__social-networks">
                    <p>Login with social google</p>
                    <div
                        className="google-btn"
                        onClick={haceGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className="link" to="/auth/register" >
                    Create a new account
                </Link>
            </form>
        </>
    )
}
