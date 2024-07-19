import { Routes, Route, Navigate, Router } from 'react-router-dom';
import { Login } from './src/components/Login.jsx';
import { AuthPage } from './src/Pages/AuthPage.jsx';
import { HomePage } from './src/components/HomePage/HomePage.jsx';
import { OrganizationView } from './src/components/Organization/OrganizationView.jsx';
import { InfoOrganization } from './src/components/Organization/InfoOrganization.jsx';
import { UserProfile } from './src/components/UserProfile/UserProfile.jsx'
import { UserEditProfile } from './src/components/UserEditProfile/UserEditProfile.jsx'
import {ChatApp} from './src/components/Chat/ChatComponents/ChatApp.jsx';
import { VolunteerRegistrationForm } from './src/volunteer/VolunteerRegister.jsx';
import { InfoVoluntering } from './src/volunteer/InfoVoluntering.jsx';
import { VoluntersView } from './src/volunteer/VolunteersView.jsx';
import { Solicitudes } from './src/components/Solicitudes/Solicitudes.jsx';

import {SoliOrganization} from './src/components/Organization/SoliOrganization.jsx'




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
        <Route path='/Chat' element={<ChatApp/>}/>
        <Route path='/SoliOrganization' element={<SoliOrganization/>}/>
        <Route path='/VolunteerRegister' element={<VolunteerRegistrationForm/>}/>
        <Route path='/infoVoluntering/:id' element={<InfoVoluntering/>}/>
        <Route path='/VoluntersView' element={<VoluntersView/>}/>
        <Route path='/Solicitudes' element={<Solicitudes/>}/>
        </Routes>
  )
}


