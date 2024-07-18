import React, { useEffect, useState } from 'react';
import { LocationMarker, LocationPicker } from '../assets/LocationPicker.jsx';
import { useVolunteer } from '../shared/hooks/useVolunteer.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import './Volunteer.css';

export const VolunteerRegistrationForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        typeOfVolunteering: '',
        location: '',
        date: '',
        timeStart: '',
        timeEnd: '',
        quota: '',
        customType: '',
        organization: '665ab7433e4aaf0a6502238f',
        imageVol: null
    });
    const [showCustomType, setShowCustomType] = useState(false);
    const { volunteerTypes, typesVolunteer, registerVolunteers, loading } = useVolunteer()
    const [tiposVolu, setTiposVolu] = useState([])



    const TypesVolue = () => {
        setTiposVolu(typesVolunteer)

    }
    useEffect(() => {
        TypesVolue()
    },
        [TypesVolue]
    )


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            typeOfVolunteering: value
        }));
        setShowCustomType(value === 'Otro');
    };

    const handleLocationChange = (location) => {
        console.log(location)
        setFormData(prevState => ({
            ...prevState,
            location
        }));
    };

    const handleImageChange = (e) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData({
                ...formData,
                imageVol: reader.result
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerVolunteers(formData)
        console.log(formData);
    };

    return (
        <div className='bodyVolRe'>
            <NavBar />
            <div className='volRegForm'>
                <form className="formRegisterVolunteer" onSubmit={handleSubmit}>
                    <p className="titleRVolu">Registrar Voluntariado</p>
                    <p className="message">Regístra y ayuda a tu comunidad.</p>

                    <div className="flex">
                        <label>
                            <input
                                className="inputRV"
                                type="text"
                                name="title"
                                placeholder=""
                                required
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <span>Título</span>
                        </label>

                        <label>
                            <input
                                className="inputRV"
                                type="number"
                                name="quota"
                                required
                                value={formData.quota}
                                onChange={handleChange}
                            />
                            <span>Espacios</span>
                        </label>
                        <label>
                            <input
                                className="inputRV"
                                type="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                            />

                        </label>
                    </div>

                    <div className="flex">
                        <label>

                            <select
                                className="inputRV"
                                name="typeOfVolunteering"
                                required
                                value={formData.typeOfVolunteering}
                                onChange={handleTypeChange}
                            >
                                {!loading && Array.isArray(tiposVolu) && tiposVolu.map(types => (
                                    <option key={types._id} value={types.name}>{types.name}</option>

                                ))}
                                <option value="Otro">Otro</option>
                            </select>
                        </label>
                        {showCustomType && (
                            <label>
                                <input
                                    className="inputRV"
                                    type="text"
                                    name="customType"
                                    placeholder="Especifique otro tipo"
                                    value={formData.customType}
                                    onChange={handleChange}
                                />
                            </label>
                        )}
                    </div>

                    <div className='flex'>
                        <label>
                            <textarea
                                className="inputRV"
                                name="description"
                                placeholder=""
                                required
                                value={formData.description}
                                onChange={handleChange}
                            />
                            <span>Descripción</span>
                        </label>

                    </div>

                    <div className="flex">

                        <label>
                            <input
                                className="inputRV"
                                type="text"
                                name="timeStart"
                                required
                                value={formData.timeStart}
                                onChange={handleChange}
                            />
                            <span>Hora de Inicio</span>
                        </label>
                        <label>
                            <input
                                className="inputRV"
                                type="text"
                                name="timeEnd"
                                required
                                value={formData.timeEnd}
                                onChange={handleChange}
                            />
                            <span>Hora de Fin</span>
                        </label>


                    </div>

                    <span class="drop-title">Sube una imagen</span>
                    <label for="file-input" class="drop-container">
                        <input type="file" name="imageVol" accept="image/*" required="" id="file-input" onChange={handleImageChange} />
                    </label>

                    <label>
                        <span>Ubicación</span>
                        <LocationPicker setLocation={handleLocationChange} />
                    </label>

                    <button className="submit" type="submit">Registrar</button>

                </form>

            </div>
            <Footer />
        </div>
    );
};
