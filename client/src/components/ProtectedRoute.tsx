import { Navigate } from 'react-router-dom'
import type { User } from '../App'

type Props = {
    user: User | null
    allowedRoles: User['role'][]
    children: React.ReactNode
}

function ProtectedRoute({ user, allowedRoles, children }: Props ) {
    if (!user) return <Navigate to="/login" />
    if (!allowedRoles.includes(user.role)) {
  alert(`You require the following role(s) to access this page: ${allowedRoles.join(', ')}`)
  return <Navigate to="/" />
}
    return <>{children}</>
}
// THESE PAGES ARE FOR TESTING PROTECTED ROUTES AND 
// SHOULD NOT BE INCLUDED IN FINAL DEMONSTRATION
export default ProtectedRoute