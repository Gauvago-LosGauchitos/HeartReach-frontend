import { NavBar } from '../components/NavBar/NavBar.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import { MapVolu } from '../assets/MapVolu.jsx';
import voluBack from '../assets/img/backVoluInfo.jpg'
import { useVolunteer } from '../shared/hooks/useVolunteer.jsx';
import { useParams,  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spinner } from '../assets/spinner/spinner.jsx';
import './InfoVoluntering.css'

export const InfoVoluntering = () => {
    const { selectedVolu, getVolunteer } = useVolunteer();
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            await getVolunteer(id);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 600)
        return () => clearTimeout(timer)
    }, [])

    console.log(selectedVolu)


    return (
        <div>
            {loading ? (
                <Spinner />
            ):(
                <div className='infoVolBody'>
            
            <NavBar />
            <div className="flex flex-col lg:flex-row bg-background">
                <div className=" info p-8 lg:w-1/3  flex-col justify-between">
                    <div>
                        <h1 className="text-primary text-3xl font-bold mb-4">Voluntariado</h1>
                        <p className="text-foreground mb-6">Buscamos voluntarios para recolección de basura en el puerto San José</p>
                        <div className="mb-6">
                            <div className="h-4 bg-primary mb-2 rounded"></div>

                            <div className="h-4 bg-primary mb-2  rounded">
                            </div>

                        </div>
                    </div>
                    <div className="bg-primary h-1 mb-6 rounded"></div>
                    <div className="bg-secondary p-6 rounded-lg shadow-lg">
                    </div>
                </div>
                <div className=" p-8 lg:flex lg:items-center">
                    
                </div>

                <MapVolu />


            </div>

            <Footer />
        </div>
            )
        }
        
        </div>
    )
}
