import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './src/components/Login.jsx';
import { Register } from './src/components/Register.jsx';
import { AuthPage } from './src/Pages/AuthPage.jsx';
import { HomePage } from './src/components/HomePage/HomePage.jsx';
import { OrganizationView } from './src/components/Organization/OrganizationView.jsx'




export const AppRoutes = () => {
  return (
    <Router>
        <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<AuthPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/' element={<Navigate to="/register"/>}/>
        <Route path='/organizations' element={<OrganizationView/>}/>

        </Routes>
    </Router>
  )
}


