import { AppRoutes } from '../routes.jsx';
import { Toaster } from "react-hot-toast";
import { ChatButton } from './components/Chat/ChatButton/ChatButton.jsx';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleChatButtonClick = () => {
    console.log('Chat button clicked');
    navigate('/Chat');
  };

  return (
    <>
      <AppRoutes />
      <Toaster position='bottom-right' reverseOrder={false}/> 
      <ChatButton onClick={handleChatButtonClick} />
    </>
  );
}

export default App;
