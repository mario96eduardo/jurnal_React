import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { useDispatch, useSelector ,} from 'react-redux';
import { removeError, setError } from '../actions/ui';
import { startRegisterWithEmailPasswordName } from '../actions/auth';
export const RegisterSceen = () => {
    const dispatch = useDispatch();

    const [value, handlerInputChanger] = useForm({
        name: 'Mario Alarcón',
        email: 'marioeduardoalarcon@gmail.com',
        password: '123456',
        password2: '123456',

    })
    const {msgError}=useSelector(state=>state.ui);

    const { name, email, password, password2 } = value
    const handlerSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
         dispatch(startRegisterWithEmailPasswordName(name, email, password))   
        } else {
            console.log('No inválido');
        }

    }
    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('name is empty'))
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email invalido'))
            return false
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('Password invalido'))
            return false
        }
        dispatch(removeError())
        return true;
    }
    return (
        <>
            <h3 className="auth__title">Registro</h3>
            <form onSubmit={handlerSubmit}>
             {msgError&&  ( <div className="auth__alert-error">
                  {msgError}
                </div>)}
                <input type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handlerInputChanger}
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                />
                <input type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handlerInputChanger}
                    className="auth__input"
                    autoComplete="off"
                    value={email}

                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={handlerInputChanger}
                    name="password"
                    className="auth__input"
                    value={password}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    onChange={handlerInputChanger}
                    name="password2"
                    className="auth__input"
                    value={password2}
                />
                <button
                    className="btn btn-primary btn-blick mb-5"
                    type='submit'

                >Register</button>


                <Link className="link mt-5" to="/auth/login" >
                    Already Registered?
                </Link>
            </form>
        </>
    )
}
