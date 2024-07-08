import { useEffect, useState } from 'react';
import './InfoOrganization.css';
import ImgDefault from '../../assets/img/bg.svg';
import ImgWaos from '../../assets/img/ensalada-1.png'
import timexD from '../../assets/img/time.svg'
import UbixD from '../../assets/img/gps.svg'
import PhonexD from '../../assets/img/phone.svg'
import { useOrganization } from '../../shared/hooks/useOrganization';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../assets/spinner/spinner.jsx';
import { NavBar } from '../NavBar/NavBar.jsx';


export const InfoOrganization = () => {
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const { getOrgsId, selectedOrg, isLoading } = useOrganization();

    useEffect(() => {
        const fetchData = async () => {
            await getOrgsId(id);
        };
        fetchData();
    }, []);



    return (
    
                <div className='body-infoxd'>
                    <header className='headers'>
                        <img className='bg' src={ImgDefault} alt="" />
                        <img className='esp' alt="" />
                        <div className='volu containe'>
                            <a href="#" className='logoWaos'>HeartReach</a>
                        </div>

                        <div className='header-content containe'>

                            <div className='header-infoxd'>

                                <div className='header-txt'>
                                    <h1>{selectedOrg.name}</h1>
                                    <p>
                                        {selectedOrg.description}
                                    </p>
                                    <a href="#" className='btn-1'>Unirme</a>
                                </div>
                                <div className='header-img'>
                                    <img src={ImgWaos} alt="" />
                                </div>
                            </div>
                        </div>
                    </header>
                    <section className='info containe'>
                        <div className='info-1'>
                            <img src={timexD} alt="" />
                            <h3>Role</h3>
                            <p>{selectedOrg.role}</p>
                        </div>

                        <div className='info-1'>
                            <img src={UbixD} alt="" />
                            <h3>Ubicacion</h3>
                            <p>{selectedOrg.address}</p>
                        </div>

                        <div className='info-1'>
                            <img src={PhonexD} alt="" />
                            <h3>Telefono</h3>
                            <p>{selectedOrg.phone}</p>
                        </div>
                    </section>
                </div>
         
    )
};