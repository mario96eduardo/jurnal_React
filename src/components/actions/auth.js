import Swal from 'sweetalert2';
import { types } from '../../types/types'
import { auth, googleAuthProveder, signInWithPopup } from '../../firebase/firebase-config';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { finishLoading, startLoading } from './ui';
export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {
        const auth = getAuth();
        dispatch(startLoading());
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                // Signed in

                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
                // ...
            })
            .catch((e) => {
                dispatch(finishLoading());
                console.log(e.message);
                Swal.fire({
                    title: 'oh oh!',
                    text: e.message,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })
            });

        //  

    }
}

export const startRegisterWithEmailPasswordName = (name, email, password) => {

    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                // Signed in
                await updateProfile(user, {
                    displayName: name
                });
                console.log(user)
                dispatch(login(user.uid, user.displayName))
                // ...
            })
            .catch((e) => {
                console.log(e.code,
                    e.message)
                    Swal.fire({
                        title: 'oh oh!',
                        text: e.message,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                      })
                // ..
            });


    }
}

export const startLoginGoogle = () => {
    return (dispatch) => {
        signInWithPopup(auth, googleAuthProveder)
            .then(({ user }) => {
                //   console.log(user.uid, user.displayName)
                dispatch(login(user.uid, user.displayName))
            })
    }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})
export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();
        await auth.signOut();
        dispatch(logout());
    }

}
export const logout = () => {
    return {
        type: types.logout
    }
}