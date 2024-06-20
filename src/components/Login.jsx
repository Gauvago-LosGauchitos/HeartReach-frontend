import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/hooks/useAuth';
import logo from '../assets/img/logo.png';
import image from '../assets/img/imgAuth.png'
import image2 from '../assets/img/jardin.png'

export const Login = () => {
  const [containerClass, setContainerClass] = useState('');
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSignUpClick = () => {
    setContainerClass('sign-up-mode');
  };

  const handleSignInClick = () => {
    setContainerClass('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(formData.identifier, formData.password);
    if (success) {
      navigate('/home');
    }
  };

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    name: '',
    surname: '',
    dpi: '',
    username: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await register(
      formData.name,
      formData.surname,
      formData.dpi,
      formData.username,
      formData.password,
      formData.email,
      formData.phone
    );
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className={`container ${containerClass}`}>
      <div className="signin-signup">
        <form className="sign-in-form" onSubmit={handleLogin}>
          <h2 className="title">Login</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="identifier"
              placeholder="Username or Email"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <p className="account-text">
            No tienes una cuenta?{' '}
            <a href="#" onClick={handleSignUpClick} id="sign-up-btn2">
              Registrate
            </a>
          </p>
          <button type="submit" className="btnAuth">Login</button>
        </form>

        <form className="sign-up-form" onSubmit={handleRegister}>
          <h2 className="title">Registro</h2>
          <div className="input-group">
            <div className="input-field">
            <i className="fas fa-lock"></i>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
            <i className="fas fa-lock"></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-field">
            <i className="fas fa-lock"></i>
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
            <i className="fas fa-lock"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-field">
            <i className="fas fa-lock"></i>
              <input
                type="text"
                name="dpi"
                placeholder="DPI"
                value={formData.dpi}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
            <i className="fas fa-lock"></i>
              
              <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            </div>
          </div>
          <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
          </div>
          <p className="account-text">
            Ya tienes una cuenta?{' '}
            <a href="#" onClick={handleSignInClick} id="sign-in-btn2">
              Logueate
            </a>
          </p>
          <button type="submit" className="btnAuth">Registrate</button>
        </form>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Miembro ya?</h3>
            <p>Logueate y continua tu aventura!</p>
            <button className="btnAuth" onClick={handleSignInClick}>Ingresa!</button>
          </div>
          <img src={image2} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>¿Nuevo por aquí?</h3>
            <p>Registrate para iniciar tu aventura!!</p>
            <button className="btnAuth" onClick={handleSignUpClick}>Unete!</button>
          </div>
          <img src={image} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

