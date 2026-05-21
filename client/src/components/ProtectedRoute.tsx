import { Navigate } from 'react-router-dom'
import type { User } from '../App'

type Props = {
  user: User | null
  allowedRoles: NonNullable<User['roles']>
  children: React.ReactNode
}

function ProtectedRoute({ user, allowedRoles, children }: Props) {
  if (!user) {
    return <Navigate to="/login" />
  }

  const hasPermission = user.roles?.some(role => allowedRoles.includes(role))

  if (!hasPermission) {
    alert(
      `You require one of the following role(s) to access this page: ${allowedRoles.join(', ')}`
    )

    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default ProtectedRoute
