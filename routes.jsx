import { Routes, Route, Navigate, Router } from 'react-router-dom';
import { Login } from './src/components/Login.jsx';
import { AuthPage } from './src/Pages/AuthPage.jsx';
import { HomePage } from './src/components/HomePage/HomePage.jsx';
import { OrganizationView } from './src/components/Organization/OrganizationView.jsx';
import { InfoOrganization } from './src/components/Organization/InfoOrganization.jsx';
import { UserProfile } from './src/components/UserProfile/UserProfile.jsx'
import { UserEditProfile } from './src/components/UserEditProfile/UserEditProfile.jsx'




export const AppRoutes = () => {
  return (
        <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/organizations' element={<OrganizationView/>}/>
        <Route path='/infoOrganization/:id' element={<InfoOrganization/>}/>
        <Route path='/userProfile' element={<UserProfile/>}/>
        <Route path='/userEditProfile' element={<UserEditProfile/>}/>
        </Routes>
  )
}


