import React, { useState, useEffect } from 'react';
import './SoliOrganization.css';
import { NavBar } from '../NavBar/NavBar.jsx';
import { Footer } from '../Footer/Footer';
import useSoliOrganization from '../../shared/hooks/useSoliOrganization.jsx';
import { Spinner } from '../../assets/spinner/spinner';
import { useNavigate } from 'react-router-dom';


export const SoliOrganization = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    

    const {
        formData,
        errors,
        isSubmitting,
        submitSuccess,
        handleSubmit,
        handleChange,
        handleImagesChange
    } = useSoliOrganization();



    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    const handleHome = () =>{
        navigate('/home')
    }
    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <NavBar />
                    <div className='register'>
                        <section className='containerRegister'>
                            <h2 className="title">Registra Tu Organización</h2>
                            {submitSuccess ? (
                                <div className="success-message">
                                    <p>¡Su solicitud fue hecha con éxito!</p>
                                    <br />
                                    <button className='botonHome' onClick={handleHome}>Regresar al Home</button>
                                </div>
                            ) : (
                                <form className='form' onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className='input-box'>
                                        <div className="input-icon">
                                            <i className="fas fa-building"></i>
                                            <input
                                                type='text'
                                                id="organizationName"
                                                name="organizationName"
                                                placeholder='Nombre de la organización'
                                                value={formData.organizationName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors.organizationName && <p className="error">{errors.organizationName}</p>}
                                    </div>
                                    <div className="input-box">
                                        <div className="input-icon">
                                            <i className="fas fa-info-circle"></i>
                                            <input
                                                type='text'
                                                id="description"
                                                name="description"
                                                placeholder='Descripción'
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors.description && <p className="error">{errors.description}</p>}
                                    </div>
                                    <div className='input-box'>
                                        <div className="input-icon">
                                            <i className="fas fa-map-marker-alt"></i>
                                            <input
                                                type='text'
                                                id="address"
                                                name="address"
                                                placeholder='Dirección'
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors.address && <p className="error">{errors.address}</p>}
                                    </div>
                                    <div className="input-box">
                                        <div className="input-icon">
                                            <i className="fas fa-phone"></i>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                placeholder="Teléfono"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors.phone && <p className="error">{errors.phone}</p>}
                                    </div>
                                    <div className="input-box">
                                        <div className="input-icon">
                                            <i className="fas fa-file-upload"></i>
                                            <input
                                                type="file"
                                                id="file"
                                                name="file"
                                                accept="image/*"
                                                onChange={handleImagesChange}
                                            />
                                        </div>
                                    </div>

                                    {errors.apiError && <p className="error">{errors.apiError}</p>}
                                    <button type='submit' disabled={isSubmitting}  >
                                        {isSubmitting ? 'Registrando...' : 'Registrar'}
                                    </button>
                                </form>
                            )}
                        </section>
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
};