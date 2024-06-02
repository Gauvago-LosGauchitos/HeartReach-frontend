import imgLog from '../assets/img/imgAuth.png';
import logo from '../assets/img/logo.png';
import jardin from '../assets/img/jardin.png';
import { Input } from './Input';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  identifierValidationMessage,
  passwordValidationMessage,
  validateIdentifier,
  validateUsername,
  validatePassword,
} from "../shared/validators/validator.js";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/hooks/useAuth.jsx';

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth()

  const [formData, setFormData] = useState({
    identifier: {
      value: '',
      isValid: false,
      showError: false
    },
    password: {
      value: '',
      isValid: false,
      showError: false
    }
  });

  const handleValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value
      }
    }));
  };

  const handleValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case 'identifier':
        isValid = validateIdentifier(value);
        break;
      case 'password':
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
        showError: !isValid
      }
    }));
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    const success = await login(formData.identifier.value, formData.password.value)
    if (success) {
      navigate('/home')
    }

  }

  return (
    <div className='bodyAuth'>
      <motion.div
        className='container'
        initial={{ scale: 0 }}
        animate={{  scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <div className='arrform'>
          <img className='logo' src={logo} />
          <div className="title">Bienvenido,<br /><span>Logueate para continuar tu aventura</span></div>
          <div className='input-column'>
            <Input
              field='identifier'
              label='Email or Username'
              value={formData.identifier.value}
              onChangeHandler={handleValueChange}
              type='text'
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.identifier.showError}
              validationMessage={identifierValidationMessage}
            />
            <Input
              field='password'
              label='Password'
              value={formData.password.value}
              onChangeHandler={handleValueChange}
              type='password'
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.password.showError}
              validationMessage={passwordValidationMessage}
            />
          </div>

          <button onClick={handleLogin} className="button-confirmLogin">Let's go →</button>
          <span className="btn-link" onClick={handleNavigateToRegister}>
            ¿Ya tienes una cuenta? ¡Inicia sesión acá!
          </span>
          <img src={jardin} alt="Tree" className="bottom-left-img" />
        </div>

        <div className="panels-container">
          <div className="panel-background"></div>
          <div className="panel-overlay"></div>
          <div className="panel-content">
            <div className='ven-text'>Ven!!!</div>
            <div className="panel-text">Únete y busca tu próximo voluntariado!!</div>
            <img src={imgLog} alt="Volunteer" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
