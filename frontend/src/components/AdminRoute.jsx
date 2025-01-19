import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = ({ children }) => {
  const  isAdmin  = useSelector((state) => state.admin)
  
  return isAdmin
    ? children 
    : <Navigate to="/admin/login" replace />
}

export default AdminRoute