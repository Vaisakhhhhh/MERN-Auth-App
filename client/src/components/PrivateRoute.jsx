import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet/> : <Navigate to='/sign-in' />
}

export const AdminPrivateRoute = () => {
  const { currentAdmin } = useSelector((state) => state.admin);
return currentAdmin ? <Outlet/> : <Navigate to='/admin-login' />
}

export default PrivateRoute
