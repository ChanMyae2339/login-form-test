import React from 'react'
import CreateUser from './CreateUser'
import { useLocation, Navigate } from 'react-router'
import useAuth from '../utils/hooks/useAuth'
const UserDetail = () => {
const location = useLocation()
const {status} = useAuth()

//   if(status === 'unauthenticated'){
// 	return <Navigate to="/login" replace/>
// }
  return (
    <div>
        <CreateUser data={location?.state}/>
    </div>
  )
}

export default UserDetail