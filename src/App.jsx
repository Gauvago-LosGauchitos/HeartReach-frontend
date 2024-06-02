import {AppRoutes} from '../routes.jsx';
import { Toaster } from "react-hot-toast"

function App() {
  
  return (
    <>
    <AppRoutes />
    <Toaster position='bottom-right' reverseOrder={false}/> 
      
    </>
  )
}

export default App
