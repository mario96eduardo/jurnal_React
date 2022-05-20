

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { JournalScreen } from "../journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { getAuth } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import {  startLoading } from "../actions/notes";
export const AppRouter = () => {
    const dispatch = useDispatch();
    const [Checking, setChecking] = useState(true);


    const [isLoggedIn, SetIsLoggedIn] = useState(false);
    const auth = getAuth();
    useEffect(() => {
        auth.onAuthStateChanged(async(user) => {
            if (user?.uid) {
           
                dispatch(login(user.uid, user.displayName));
           
                dispatch(startLoading(user.uid))
                SetIsLoggedIn(true)
            } else {
                SetIsLoggedIn(false)

            }
        })
        setChecking(false)

    }, [dispatch, setChecking])
    if (Checking) {
        return <h1>Espere....</h1>
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute >

                        <JournalScreen />
                    </PrivateRoute>

                } />
                <Route path="/auth/*" element={
                     <PublicRoute>
                    <AuthRouter />
                     </PublicRoute>

                } />
            </Routes>
        </BrowserRouter>
    )

}
