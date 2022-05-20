import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {

    const {uid} = useSelector(state => state.auth);
    console.log(uid)

/*     const location= useLocation();
    console.log(location)
    localStorage.setItem('lastPath',`${location.pathname}${location.search}`) */
    return uid ? children : <Navigate to={ '/auth'}/>
}
