import { Route, Routes } from "react-router-dom"
import { LoginScreen } from "../auth/LoginScreen"
import { RegisterSceen } from "../auth/RegisterSceen"

export const AuthRouter = () => {

    return (
        <div className="auth__main">

            <div className="auth__box-container">
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterSceen />} />
                    <Route path="/" element={<LoginScreen />} />
                </Routes>
            </div>
        </div>
    )

}
