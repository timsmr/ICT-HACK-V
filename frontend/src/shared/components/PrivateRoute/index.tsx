import { Navigate } from 'react-router-dom'
import { useStore } from 'stores'
import { PrivateRouteProps } from './types/types'

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { currentUser } = useStore()
  return localStorage.getItem('userToken') ? children : <Navigate to='/auth/login' />
}