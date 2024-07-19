import { NavBar } from '../components/NavBar/NavBar.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import { MapVolu } from '../assets/MapVolu.jsx';
import { useVolunteer } from '../shared/hooks/useVolunteer.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spinner } from '../assets/spinner/spinner.jsx';
import { reverseGeocode } from '../services/api.js';
import cargando from '../assets/img/cargando.gif'
import './InfoVoluntering.css';

export const InfoVoluntering = () => {
    const { selectedVolu, getVolunteer, assignToAVolunteer, isOnA, voluAs, leaveAVolunteer } = useVolunteer();
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState('');
    const { id } = useParams();

    useEffect(() => {
        isOnA(id)
        const fetchData = async () => {
            await getVolunteer(id);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (selectedVolu?.volunteer?.location) {
            const { lat, lng } = selectedVolu?.volunteer?.location;
            reverseGeocode(lat, lng).then(setAddress);
        }
    }, [selectedVolu?.volunteer?.location]);


    const handleAsing = async () => {
        await assignToAVolunteer(id);

    }

    const handleLeave = async () => {
        await leaveAVolunteer(id);
    }
    console.log(voluAs)

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (

                <div className='infoVolBody'>
                    <NavBar />
                    {!selectedVolu.volunteer?.timeEnd ? (
                        <div className="flex flex-col lg:flex-row bg-background">
                            <div className="info p-8 lg:w-1/3 flex-col justify-between">
                                <div className="animated fadeInUp">
                                    <h1 className="text-primary text-3xl font-bold mb-4">Cargando Datos</h1>
                                    <img src={cargando} alt="cargando" className="cargando" />

                                </div>
                                <div className="bg-primary h-1 mb-6 rounded"></div>
                                <div className="bg-secondary p-6 rounded-lg shadow-lg animated fadeInUp"></div>
                            </div>
                            <div className="p-8 lg:flex lg:items-center animated fadeInUp"></div>
                            <MapVolu />
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row bg-background">
                            <div className="info p-8 lg:w-1/3 flex-col justify-between">
                                <div className="animated fadeInUp">
                                    <h1 className="text-primary text-3xl font-bold mb-4">{selectedVolu.volunteer?.title}</h1>
                                    <p className="text-foreground mb-6">{selectedVolu.volunteer?.description}</p>
                                    <div className="mb-6">
                                        <div className="h-4 bg-primary mb-2 rounded"></div>
                                        <p className="text-foreground mb-6">
                                            <h4>Hora de inicio:</h4>{selectedVolu.volunteer?.timeStart}
                                            <h4>Hora de finalización:</h4>{selectedVolu.volunteer?.timeEnd}
                                        </p>
                                        <div className="h-4 bg-primary mb-2 rounded"></div>
                                        {address && <p className="text-foreground mb-6"><h4>Ubicación:</h4>{address}</p>}
                                    </div>
                                    
                                    {voluAs === false ?(
                                        <button onClick={handleAsing} class="cssbuttons-io-button">
                                        Asignate!
                                        <div class="icon">
                                            <svg
                                                height="24"
                                                width="24"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                <path
                                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </div>
                                    </button>
                                    ): (
                                        <button onClick={handleLeave} class="cssbuttons-io-button">
                                        Darte de baja!
                                        <div class="icon">
                                            <svg
                                                height="24"
                                                width="24"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                <path
                                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </div>
                                    </button>
                                    )}
                                </div>
                                <div className="bg-primary h-1 mb-6 rounded"></div>
                                <div className="bg-secondary p-6 rounded-lg shadow-lg animated fadeInUp"></div>
                            </div>
                            <div className="p-8 lg:flex lg:items-center animated fadeInUp"></div>
                            <MapVolu />
                        </div>

                    )}

                    <Footer />
                </div>
            )}
        </div>
    );
};
