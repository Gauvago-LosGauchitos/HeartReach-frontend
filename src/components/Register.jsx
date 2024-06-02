import imgLog from '../assets/img/imgAuth.png';
import logo from '../assets/img/logo.png';
import jardin from '../assets/img/jardin.png';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './Input';
import { useState } from 'react';
import {
    emailValidationMessage,
    phoneValidationMessage,
    dpiValidationMessage,
    passConfirmValidationMessage,
    passwordValidationMessage,
    usernameValidationMessage,
    nameValidationMessage,
    surnameValidationMessage,
    validateEmail,
    validatePassConfirm,
    validatePassword,
    validateUsername,
    validateName,
    validateSurname,
    validateDpi,
    validatePhone
} from "../shared/validators/validator.js";
import { useAuth } from '../shared/hooks/useAuth.jsx';

export const Register = () => {
    const navigate = useNavigate();
    const {register, isLoading} = useAuth()

    const [formData, setFormData] = useState({
        name: {
            value: '',
            isValid: false,
            showError: false
        },
        surname: {
            value: '',
            isValid: false,
            showError: false
        },
        dpi: {
            value: '',
            isValid: false,
            showError: false
        },
        username: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        phone: {
            value: '',
            isValid: false,
            showError: false
        },
        passwordConfirm: {
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

    const handleRegister = async (e) => {
        e.preventDefault()
        register(
            formData.name.value,
            formData.surname.value,
            formData.dpi.value,
            formData.username.value,
            formData.password.value,
            formData.email.value,
            formData.phone.value
            
            
        )
    }

    const handleValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'name':
                isValid = validateName(value);
                break;
            case 'surname':
                isValid = validateSurname(value);
                break;
            case 'dpi':
                isValid = validateDpi(value);
                break;
            case 'username':
                isValid = validateUsername(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'phone':
                isValid = validatePhone(value);
                break;
            case 'passwordConfirm':
                isValid = validatePassConfirm(formData.password.value, value);
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

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className='bodyAuth'>
            <AnimatePresence>
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
                    <div className='arrForm'>
                        <img className='logo' src={logo} />
                        <div className="title">Bienvenido,<br /><span>registrate para iniciar tu aventura</span></div>
                        <div className='form'>

                            <div className="input-column">
                                <Input
                                    field='name'
                                    label='Name'
                                    value={formData.name.value}
                                    onChangeHandler={handleValueChange}
                                    type='text'
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.name.showError}
                                    validationMessage={nameValidationMessage}
                                />
                                <Input
                                    field='surname'
                                    label='Surname'
                                    value={formData.surname.value}
                                    onChangeHandler={handleValueChange}
                                    type='text'
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.surname.showError}
                                    validationMessage={surnameValidationMessage}
                                />
                                <Input
                                    field='dpi'
                                    label='DPI'
                                    value={formData.dpi.value}
                                    onChangeHandler={handleValueChange}
                                    type='text'
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.dpi.showError}
                                    validationMessage={dpiValidationMessage}
                                />
                                <Input
                                    field='username'
                                    label='UserName'
                                    value={formData.username.value}
                                    onChangeHandler={handleValueChange}
                                    type='text'
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.username.showError}
                                    validationMessage={usernameValidationMessage}
                                />
                            </div>
                            <div className="input-column">
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
                                <Input
                                    field='passwordConfirm'
                                    label='Password Confirmation'
                                    value={formData.passwordConfirm.value}
                                    onChangeHandler={handleValueChange}
                                    type='password'
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.passwordConfirm.showError}
                                    validationMessage={passConfirmValidationMessage}
                                />
                                <Input
                                    field='email'
                                    label='Email'
                                    value={formData.email.value}
                                    onChangeHandler={handleValueChange}
                                    type='text'
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.email.showError}
                                    validationMessage={emailValidationMessage}
                                />
                                <Input
                                    field='phone'
                                    label='Phone'
                                    value={formData.phone.value}
                                    onChangeHandler={handleValueChange}
                                    type='text'
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.phone.showError}
                                    validationMessage={phoneValidationMessage}
                                />
                            </div>
                            <button onClick={handleRegister} className="button-confirm">Let's go →</button>
                            <span className="btn-link" onClick={handleNavigateToLogin}>
                                ¿Ya tienes una cuenta? ¡Inicia sesión acá!
                            </span>
                            <img src={jardin} alt="Tree" className="bottom-left-img" />
                        </div>

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
            </AnimatePresence>
        </div>
    );
};