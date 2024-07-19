import { useEffect, useState } from 'react';
import '../components/Organization/OrganizationView.css';
import ImgDefault from '../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import { useVolunteer } from '../shared/hooks/useVolunteer.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import { Spinner } from '../assets/spinner/spinner.jsx';

export const VoluntersView = () => {
  const [loading, setLoading] = useState(true)
  const { volunteers, isLoading } = useVolunteer();
  const navigate = useNavigate();

  const hanadlerInfoVolunteer = (id) => {
    navigate(`/infoVoluntering/${id}`);
  }

  console.log('Voluntariados array:', volunteers);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  return (

    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='body'>
          <NavBar />
          <h2 className="section__header">Escoje tu proximo voluntariado</h2>
          <div className='object'>
            {!isLoading && volunteers.map((volItem, index) => (
              <div key={index} className='target' onClick={() => hanadlerInfoVolunteer(volItem._id)}>
                <div className='container-organization'>
                  {/* Otros elementos */}
                  <div class="YoutubeVideo">
                    <div class="Image"><img src={volItem?.imageVol} alt="Logo" className='logo-organization'/></div>
                    <div class="Icon"> <img src={ImgDefault} alt="Organization Logo" className='img' /></div>
                    <div class="Title"><center><p>{volItem?.title || "Titulo no disponible"}</p></center></div>
                    <div class="Name"><p>{volItem?.description || "Descripcion no disponible"}</p></div>
                    <div class="Tel"><p>Hora de inicio: {volItem?.timeStart || "Hora de inicio no disponible"}</p></div>
                    <div class="Tel"><p>Hora de finalización: {volItem?.timeEnd || "Hora de finalización no disponible"}</p></div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}